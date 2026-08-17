"use client"

// Feature: chunking/pagination. Turns a flat puzzle count into laid-out pages.

import { useMemo } from "react"

import {
  SUDOKUS_PER_PAGE_PUZZLE,
  SUDOKUS_PER_PAGE_SOLUTION,
} from "./config"
import { generatePuzzle } from "./sudoku"
import type { BookConfig, BookPage, Puzzle } from "./types"

function chunk<T>(items: T[], size: number): T[][] {
  const pages: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size))
  }
  return pages
}

export interface Book {
  pages: BookPage[]
  puzzleCount: number
  puzzlePageCount: number
  solutionPageCount: number
}

export function useBook({ quantity, difficulty }: BookConfig): Book {
  return useMemo(() => {
    const puzzles: Puzzle[] = Array.from({ length: quantity }, (_, i) =>
      generatePuzzle(i + 1, difficulty),
    )

    const puzzlePages: BookPage[] = chunk(
      puzzles,
      SUDOKUS_PER_PAGE_PUZZLE,
    ).map((group, i) => ({ id: `p-${i}`, kind: "puzzle", puzzles: group }))

    // Solutions always live at the very end of the book.
    const solutionPages: BookPage[] = chunk(
      puzzles,
      SUDOKUS_PER_PAGE_SOLUTION,
    ).map((group, i) => ({ id: `s-${i}`, kind: "solution", puzzles: group }))

    return {
      pages: [...puzzlePages, ...solutionPages],
      puzzleCount: puzzles.length,
      puzzlePageCount: puzzlePages.length,
      solutionPageCount: solutionPages.length,
    }
  }, [quantity, difficulty])
}
