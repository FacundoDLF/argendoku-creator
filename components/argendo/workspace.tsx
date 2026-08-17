// Widget: the dark canvas holding the paper sheets.

import type { Book } from "@/lib/argendo/use-book"
import { PageCard } from "./page-card"

export function Workspace({ book }: { book: Book }) {
  const { pages, puzzleCount, puzzlePageCount, solutionPageCount } = book

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
          />
        ))}
      </div>
    </div>
  )
}
