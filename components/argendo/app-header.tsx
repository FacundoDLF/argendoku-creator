// Widget: sticky header with brand identity.

import { Grid3x3 } from "lucide-react"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-700/70 bg-stone-800/95 backdrop-blur supports-backdrop-filter:bg-stone-800/80">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-md bg-orange-700 text-amber-50">
            <Grid3x3 className="size-5" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-lg font-bold text-amber-50">
              ArgenDo-Ku Creator
            </span>
            <span className="hidden text-xs text-amber-50/50 sm:block">
              Maquetador de libros de Sudoku para KDP
            </span>
          </div>
        </div>

        <span className="rounded-md bg-stone-900/70 px-3 py-1.5 text-sm font-medium text-amber-50/70">
          Modo Creación
        </span>
      </div>
    </header>
  )
}
