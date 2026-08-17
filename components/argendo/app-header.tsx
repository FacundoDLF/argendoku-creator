"use client"

// Widget: sticky header with brand + Juego/Creación segmented control.

import { Grid3x3 } from "lucide-react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { WorkMode } from "@/lib/argendo/types"

interface AppHeaderProps {
  mode: WorkMode
  onModeChange: (mode: WorkMode) => void
}

export function AppHeader({ mode, onModeChange }: AppHeaderProps) {
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

        <Tabs
          value={mode}
          onValueChange={(value) => onModeChange(value as WorkMode)}
        >
          <TabsList className="bg-stone-900/70">
            <TabsTrigger
              value="juego"
              disabled
              className="px-3 text-amber-50/40"
            >
              Juego
            </TabsTrigger>
            <TabsTrigger
              value="creacion"
              className="px-3 data-active:bg-orange-700 data-active:text-amber-50"
            >
              Creación
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </header>
  )
}
