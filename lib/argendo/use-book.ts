"use client"

// Feature: pure layout. Turns an owned puzzle list into laid-out book pages.

import { useMemo } from "react"

import {
  SUDOKUS_PER_PAGE_PUZZLE,
  SUDOKUS_PER_PAGE_SOLUTION,
} from "./config"
import type { BookPage, PageItem, Puzzle } from "./types"

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

/**
 * Lay out a book from the current puzzle list.
 * Puzzle sheets come first, solution sheets always last, and both share the
 * same 1-based numbering derived from list order — so removing a puzzle also
 * removes its mirrored solution automatically.
 */
export function useBook(puzzles: Puzzle[]): Book {
  return useMemo(() => {
    const numbered: PageItem[] = puzzles.map((puzzle, i) => ({
      puzzle,
      number: i + 1,
    }))

    const puzzlePages: BookPage[] = chunk(
      numbered,
      SUDOKUS_PER_PAGE_PUZZLE,
    ).map((items, i) => ({ id: `p-${i}`, kind: "puzzle", items }))

    const solutionPages: BookPage[] = chunk(
      numbered,
      SUDOKUS_PER_PAGE_SOLUTION,
    ).map((items, i) => ({ id: `s-${i}`, kind: "solution", items }))

    return {
      pages: [...puzzlePages, ...solutionPages],
      puzzleCount: puzzles.length,
      puzzlePageCount: puzzlePages.length,
      solutionPageCount: solutionPages.length,
    }
  }, [puzzles])
}
