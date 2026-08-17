// Widget: a paper sheet. Renders puzzle layout (2-up) or solutions layout (6-up).

import { DIFFICULTY_LABELS } from "@/lib/argendo/config"
import type { BookPage, Puzzle } from "@/lib/argendo/types"
import { SudokuGrid } from "./sudoku-grid"

function PuzzleBlock({ puzzle }: { puzzle: Puzzle }) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <h3 className="font-serif text-lg font-semibold text-paper-ink">
          Puzle #{puzzle.id}
        </h3>
        <span className="rounded-full border border-paper-line-strong/40 px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-wide text-paper-ink/70">
          {DIFFICULTY_LABELS[puzzle.difficulty]}
        </span>
      </div>
      <div className="mx-auto w-full max-w-[78%]">
        <SudokuGrid values={puzzle.given} />
      </div>
    </div>
  )
}

function SolutionBlock({ puzzle }: { puzzle: Puzzle }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-serif text-xs font-semibold text-paper-ink">
        Puzle #{puzzle.id}
      </span>
      <SudokuGrid values={puzzle.solution} />
    </div>
  )
}

interface PageCardProps {
  page: BookPage
  index: number
  total: number
}

export function PageCard({ page, index, total }: PageCardProps) {
  const isPuzzle = page.kind === "puzzle"

  return (
    <figure className="flex flex-col gap-2">
      <div className="relative aspect-[1/1.414] w-full rounded-sm bg-paper p-[7%] shadow-2xl shadow-black/60 ring-1 ring-black/30">
        {isPuzzle ? (
          <div className="flex h-full flex-col gap-6">
            {page.puzzles.map((puzzle) => (
              <PuzzleBlock key={puzzle.id} puzzle={puzzle} />
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-col gap-3">
            <h3 className="font-serif text-base font-semibold text-paper-ink">
              Soluciones
            </h3>
            <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-3">
              {page.puzzles.map((puzzle) => (
                <SolutionBlock key={puzzle.id} puzzle={puzzle} />
              ))}
            </div>
          </div>
        )}

        <span className="absolute inset-x-0 bottom-[3%] text-center font-serif text-xs text-paper-ink/50">
          {index + 1}
        </span>
      </div>

      <figcaption className="flex items-center justify-between px-1 text-xs text-amber-50/40">
        <span>{isPuzzle ? "Puzles" : "Soluciones"}</span>
        <span>
          Página {index + 1} / {total}
        </span>
      </figcaption>
    </figure>
  )
}
