"use client"

// App shell: owns global state and composes header / toolbar / workspace / dialog.

import { useState } from "react"

import { AppHeader } from "@/components/argendo/app-header"
import { ExportDialog } from "@/components/argendo/export-dialog"
import { Toolbar } from "@/components/argendo/toolbar"
import { Workspace } from "@/components/argendo/workspace"
import { DEFAULT_QUANTITY } from "@/lib/argendo/config"
import type { BookConfig, WorkMode } from "@/lib/argendo/types"
import { useBook } from "@/lib/argendo/use-book"

export default function Page() {
  const [mode, setMode] = useState<WorkMode>("creacion")
  const [config, setConfig] = useState<BookConfig>({
    difficulty: "medio",
    format: "a4",
    quantity: DEFAULT_QUANTITY,
  })
  const [exportOpen, setExportOpen] = useState(false)

  const book = useBook(config)
  const patchConfig = (patch: Partial<BookConfig>) =>
    setConfig((prev) => ({ ...prev, ...patch }))

  return (
    <div className="min-h-screen bg-stone-900 font-sans text-amber-50">
      <AppHeader mode={mode} onModeChange={setMode} />
      <Toolbar
        config={config}
        onChange={patchConfig}
        onExportPdf={() => setExportOpen(true)}
      />
      <main>
        <Workspace book={book} />
      </main>

      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        pageCount={book.pages.length}
      />
    </div>
  )
}
