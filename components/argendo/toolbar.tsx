"use client"

// Feature: controls bar. Column on mobile, row on desktop.

import { useState } from "react"
import { FileText, ImageDown, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DIFFICULTY_OPTIONS,
  EXPORT_SIMULATION_MS,
  FORMAT_OPTIONS,
  MAX_QUANTITY,
  MIN_QUANTITY,
} from "@/lib/argendo/config"
import type { BookConfig, Difficulty, PaperFormat } from "@/lib/argendo/types"
import { LabeledSelect } from "./labeled-select"

interface ToolbarProps {
  config: BookConfig
  onChange: (patch: Partial<BookConfig>) => void
  onExportPdf: () => void
}

export function Toolbar({ config, onChange, onExportPdf }: ToolbarProps) {
  const [imageBusy, setImageBusy] = useState(false)

  const handleQuantity = (raw: string) => {
    const parsed = Number.parseInt(raw, 10)
    if (Number.isNaN(parsed)) return onChange({ quantity: MIN_QUANTITY })
    const clamped = Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, parsed))
    onChange({ quantity: clamped })
  }

  const handleExportImage = () => {
    setImageBusy(true)
    window.setTimeout(() => setImageBusy(false), EXPORT_SIMULATION_MS)
  }

  return (
    <div className="border-b border-stone-700/70 bg-stone-800">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex lg:flex-wrap lg:items-end">
          <div className="lg:w-52">
            <LabeledSelect<Difficulty>
              id="difficulty"
              label="Nivel de dificultad"
              value={config.difficulty}
              options={DIFFICULTY_OPTIONS}
              onValueChange={(difficulty) => onChange({ difficulty })}
            />
          </div>
          <div className="lg:w-56">
            <LabeledSelect<PaperFormat>
              id="format"
              label="Formato"
              value={config.format}
              options={FORMAT_OPTIONS}
              onValueChange={(format) => onChange({ format })}
            />
          </div>
          <div className="flex flex-col gap-1.5 lg:w-28">
            <label
              htmlFor="quantity"
              className="text-xs font-medium uppercase tracking-wide text-amber-50/50"
            >
              Cantidad
            </label>
            <input
              id="quantity"
              type="number"
              min={MIN_QUANTITY}
              max={MAX_QUANTITY}
              value={config.quantity}
              onChange={(e) => handleQuantity(e.target.value)}
              className="h-9 w-full rounded-lg border border-stone-600 bg-stone-900/60 px-3 text-sm text-amber-50 outline-none transition-colors focus-visible:border-orange-600 focus-visible:ring-3 focus-visible:ring-orange-700/40"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button
            variant="outline"
            onClick={handleExportImage}
            disabled={imageBusy}
            className="h-9 border-stone-600 bg-transparent text-amber-50 hover:bg-stone-700 hover:text-amber-50"
          >
            {imageBusy ? (
              <Loader2 data-icon="inline-start" className="animate-spin" />
            ) : (
              <ImageDown data-icon="inline-start" />
            )}
            {imageBusy ? "Exportando..." : "Exportar PNG/JPG"}
          </Button>
          <Button
            onClick={onExportPdf}
            className="h-9 bg-orange-700 px-4 font-semibold text-amber-50 hover:bg-orange-800"
          >
            <FileText data-icon="inline-start" />
            Exportar PDF (KDP)
          </Button>
        </div>
      </div>
    </div>
  )
}
