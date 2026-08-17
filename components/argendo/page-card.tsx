"use client"

// Widget: a paper sheet. Puzzle sheets are editable (removable); solutions mirror.

import { Trash2, X } from "lucide-react"

import { DIFFICULTY_LABELS } from "@/lib/argendo/config"
import type { BookPage, PageItem } from "@/lib/argendo/types"
import { SudokuGrid } from "./sudoku-grid"

function PuzzleBlock({
  item,
  onRemove,
}: {
  item: PageItem
  onRemove: () => void
}) {
  const { puzzle, number } = item
  return (
    <div className="group/puzzle flex flex-1 flex-col gap-2">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-serif text-lg font-semibold text-paper-ink">
          Puzle #{number}
        </h3>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-paper-line-strong/40 px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-wide text-paper-ink/70">
            {DIFFICULTY_LABELS[puzzle.difficulty]}
          </span>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Eliminar puzle #${number}`}
            className="flex size-6 items-center justify-center rounded-full border border-paper-line-strong/40 text-paper-ink/60 transition-colors hover:border-orange-700 hover:bg-orange-700 hover:text-paper"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[78%]">
        <SudokuGrid values={puzzle.given} />
      </div>
    </div>
  )
}

function SolutionBlock({ item }: { item: PageItem }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-serif text-xs font-semibold text-paper-ink">
        Puzle #{item.number}
      </span>
      <SudokuGrid values={item.puzzle.solution} />
    </div>
  )
}

interface PageCardProps {
  page: BookPage
  index: number
  total: number
  onRemovePuzzle: (uid: string) => void
  onRemovePage: (uids: string[]) => void
}

export function PageCard({
  page,
  index,
  total,
  onRemovePuzzle,
  onRemovePage,
}: PageCardProps) {
  const isPuzzle = page.kind === "puzzle"

  return (
    <figure className="flex flex-col gap-2">
      <div className="relative aspect-[1/1.414] w-full rounded-sm bg-paper p-[7%] shadow-2xl shadow-black/60 ring-1 ring-black/30">
        {isPuzzle ? (
          <div className="flex h-full flex-col gap-6">
            {page.items.map((item) => (
              <PuzzleBlock
                key={item.puzzle.uid}
                item={item}
                onRemove={() => onRemovePuzzle(item.puzzle.uid)}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-col gap-3">
            <h3 className="font-serif text-base font-semibold text-paper-ink">
              Soluciones
            </h3>
            <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-3">
              {page.items.map((item) => (
                <SolutionBlock key={item.puzzle.uid} item={item} />
              ))}
            </div>
          </div>
        )}

        <span className="absolute inset-x-0 bottom-[3%] text-center font-serif text-xs text-paper-ink/50">
          {index + 1}
        </span>
      </div>

      <figcaption className="flex items-center justify-between px-1 text-xs text-amber-50/40">
        {isPuzzle ? (
          <button
            type="button"
            onClick={() => onRemovePage(page.items.map((i) => i.puzzle.uid))}
            className="flex items-center gap-1 rounded text-amber-50/50 transition-colors hover:text-orange-400"
          >
            <Trash2 className="size-3.5" />
            Eliminar página
          </button>
        ) : (
          <span className="italic">Generadas automáticamente</span>
        )}
        <span>
          Página {index + 1} / {total}
        </span>
      </figcaption>
    </figure>
  )
}
