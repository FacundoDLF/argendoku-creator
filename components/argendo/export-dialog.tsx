"use client"

// Feature: KDP export flow. Radio profile + simulated 300 DPI processing.

import { useState } from "react"
import { CheckCircle2, FileDown, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { COLOR_PROFILE_OPTIONS, EXPORT_SIMULATION_MS } from "@/lib/argendo/config"
import type { ColorProfile } from "@/lib/argendo/types"
import { cn } from "@/lib/utils"

type Phase = "idle" | "processing" | "done"

interface ExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pageCount: number
}

export function ExportDialog({
  open,
  onOpenChange,
  pageCount,
}: ExportDialogProps) {
  const [profile, setProfile] = useState<ColorProfile>("cmyk")
  const [phase, setPhase] = useState<Phase>("idle")

  const busy = phase === "processing"

  const handleOpenChange = (next: boolean) => {
    if (busy) return
    if (!next) setPhase("idle")
    onOpenChange(next)
  }

  const handleSubmit = () => {
    setPhase("processing")
    window.setTimeout(() => setPhase("done"), EXPORT_SIMULATION_MS)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={!busy}
        className="border border-stone-700 bg-stone-800 text-amber-50 sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="font-serif text-lg">
            Exportar PDF para KDP
          </DialogTitle>
          <DialogDescription className="text-amber-50/50">
            {pageCount} páginas listas para maquetar. Elegí el perfil de color de
            salida.
          </DialogDescription>
        </DialogHeader>

        {phase === "done" ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 className="size-10 text-orange-500" />
            <p className="font-serif text-base font-semibold text-amber-50">
              ¡Exportación completada!
            </p>
            <p className="max-w-xs text-sm text-amber-50/50">
              Tu libro de {pageCount} páginas se generó en perfil{" "}
              {profile === "cmyk" ? "CMYK (300 DPI)" : "RGB digital"}.
            </p>
          </div>
        ) : (
          <RadioGroup
            value={profile}
            onValueChange={(value) => setProfile(value as ColorProfile)}
            className="gap-3 py-1"
          >
            {COLOR_PROFILE_OPTIONS.map((option) => {
              const active = profile === option.value
              return (
                <label
                  key={option.value}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
                    active
                      ? "border-orange-600 bg-orange-800/25"
                      : "border-stone-600 bg-stone-900/40 hover:border-stone-500",
                    busy && "pointer-events-none opacity-60",
                  )}
                >
                  <RadioGroupItem
                    value={option.value}
                    disabled={busy}
                    className="mt-0.5 border-stone-500 data-checked:border-orange-600 data-checked:bg-orange-700"
                  />
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-amber-50">
                      {option.label}
                    </span>
                    {option.hint ? (
                      <span className="text-xs text-amber-50/50">
                        {option.hint}
                      </span>
                    ) : null}
                  </span>
                </label>
              )
            })}
          </RadioGroup>
        )}

        <DialogFooter className="border-stone-700 bg-stone-900/40">
          {phase === "done" ? (
            <Button
              onClick={() => handleOpenChange(false)}
              className="bg-orange-700 text-amber-50 hover:bg-orange-800"
            >
              Cerrar
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={busy}
              className="bg-orange-700 text-amber-50 hover:bg-orange-800"
            >
              {busy ? (
                <Loader2 data-icon="inline-start" className="animate-spin" />
              ) : (
                <FileDown data-icon="inline-start" />
              )}
              {busy ? "Procesando páginas..." : "Generar PDF"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
