"use client"

// App shell: owns the puzzle list and composes header / toolbar / workspace / dialog.

import { useCallback, useState } from "react"

import { AppHeader } from "@/components/argendo/app-header"
import { ExportDialog } from "@/components/argendo/export-dialog"
import { Toolbar } from "@/components/argendo/toolbar"
import { Workspace } from "@/components/argendo/workspace"
import { DEFAULT_QUANTITY } from "@/lib/argendo/config"
import { createPuzzles } from "@/lib/argendo/sudoku"
import type { BookConfig, Puzzle } from "@/lib/argendo/types"
import { useBook } from "@/lib/argendo/use-book"

export default function Page() {
  const [config, setConfig] = useState<BookConfig>({
    difficulty: "medio",
    format: "a4",
    quantity: DEFAULT_QUANTITY,
  })
  const [puzzles, setPuzzles] = useState<Puzzle[]>([])
  const [exportOpen, setExportOpen] = useState(false)

  const book = useBook(puzzles)

  const patchConfig = (patch: Partial<BookConfig>) =>
    setConfig((prev) => ({ ...prev, ...patch }))

  // Append a fresh batch — lets the user stack levels: 10 fáciles, 10 medios…
  const addPuzzles = useCallback(() => {
    setPuzzles((prev) => [
      ...prev,
      ...createPuzzles(config.quantity, config.difficulty),
    ])
  }, [config.quantity, config.difficulty])

  // Removing a puzzle drops its mirrored solution too (solutions are derived).
  const removePuzzle = useCallback((uid: string) => {
    setPuzzles((prev) => prev.filter((p) => p.uid !== uid))
  }, [])

  const removePuzzles = useCallback((uids: string[]) => {
    const drop = new Set(uids)
    setPuzzles((prev) => prev.filter((p) => !drop.has(p.uid)))
  }, [])

  const clearBook = useCallback(() => setPuzzles([]), [])

  return (
    <div className="min-h-screen bg-stone-900 font-sans text-amber-50">
      <AppHeader />
      <Toolbar
        config={config}
        hasPuzzles={puzzles.length > 0}
        onChange={patchConfig}
        onAddPuzzles={addPuzzles}
        onClear={clearBook}
        onExportPdf={() => setExportOpen(true)}
      />
      <main>
        <Workspace
          book={book}
          onRemovePuzzle={removePuzzle}
          onRemovePage={removePuzzles}
          onAddPuzzles={addPuzzles}
        />
      </main>

      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        pageCount={book.pages.length}
      />
    </div>
  )
}
