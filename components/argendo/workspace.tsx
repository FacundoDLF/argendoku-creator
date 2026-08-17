"use client"

// Widget: the dark canvas holding the paper sheets, with an empty state.

import { BookOpen, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Book } from "@/lib/argendo/use-book"
import { PageCard } from "./page-card"

interface WorkspaceProps {
  book: Book
  onRemovePuzzle: (uid: string) => void
  onRemovePage: (uids: string[]) => void
  onAddPuzzles: () => void
}

export function Workspace({
  book,
  onRemovePuzzle,
  onRemovePage,
  onAddPuzzles,
}: WorkspaceProps) {
  const { pages, puzzleCount, puzzlePageCount, solutionPageCount } = book

  if (puzzleCount === 0) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-24 sm:px-6">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
          <div className="flex size-16 items-center justify-center rounded-full border border-stone-700 bg-stone-800 text-amber-50/60">
            <BookOpen className="size-7" />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-amber-50">
            Tu libro está vacío
          </h2>
          <p className="text-pretty text-sm leading-relaxed text-amber-50/50">
            Elegí un nivel y una cantidad, y usá{" "}
            <span className="font-semibold text-amber-50">+ Agregar</span> para
            ir armando el libro por lotes. Podés apilar tandas de distintos
            niveles; las soluciones se acomodan solas al final.
          </p>
          <Button
            onClick={onAddPuzzles}
            className="bg-orange-700 font-semibold text-amber-50 hover:bg-orange-800"
          >
            <Plus data-icon="inline-start" />
            Agregar el primer lote
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-amber-50/50">
        <span>
          <span className="font-semibold text-amber-50">{puzzleCount}</span>{" "}
          puzles
        </span>
        <span>
          <span className="font-semibold text-amber-50">
            {puzzlePageCount}
          </span>{" "}
          páginas de puzles
        </span>
        <span>
          <span className="font-semibold text-amber-50">
            {solutionPageCount}
          </span>{" "}
          páginas de soluciones
        </span>
        <span>
          <span className="font-semibold text-amber-50">{pages.length}</span>{" "}
          páginas totales
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pages.map((page, i) => (
          <PageCard
            key={page.id}
            page={page}
            index={i}
            total={pages.length}
            onRemovePuzzle={onRemovePuzzle}
            onRemovePage={onRemovePage}
          />
        ))}
      </div>
    </div>
  )
}
