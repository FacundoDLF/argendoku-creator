// Loop Engineering: every tunable lives here so layout math never gets rewritten.

import type { ColorProfile, Difficulty, PaperFormat } from "./types"

export const SUDOKUS_PER_PAGE_PUZZLE = 2
export const SUDOKUS_PER_PAGE_SOLUTION = 6

export const DEFAULT_QUANTITY = 10
export const MIN_QUANTITY = 1
export const MAX_QUANTITY = 200

/** Milliseconds the KDP export is simulated for. */
export const EXPORT_SIMULATION_MS = 2000

interface Option<T extends string> {
  value: T
  label: string
}

/** How many cells stay visible per difficulty (out of 81). */
export const DIFFICULTY_GIVENS: Record<Difficulty, number> = {
  facil: 42,
  medio: 34,
  dificil: 28,
  experto: 23,
}

export const DIFFICULTY_OPTIONS: Array<Option<Difficulty>> = [
  { value: "facil", label: "Fácil" },
  { value: "medio", label: "Medio" },
  { value: "dificil", label: "Difícil" },
  { value: "experto", label: "Experto" },
]

export const FORMAT_OPTIONS: Array<Option<PaperFormat>> = [
  { value: "a4", label: "A4 (21 × 29,7 cm)" },
  { value: "a5", label: "A5 (14,8 × 21 cm)" },
  { value: "letter", label: 'Carta (8,5 × 11")' },
]

export const COLOR_PROFILE_OPTIONS: Array<
  Option<ColorProfile> & { hint?: string }
> = [
  {
    value: "rgb",
    label: "Digital (RGB)",
    hint: "Ideal para lectura en pantalla y vista previa.",
  },
  {
    value: "cmyk",
    label: "Impresión Profesional (CMYK)",
    hint: "Generación en 300 DPI y color CMYK apto KDP.",
  },
]

export const DIFFICULTY_LABELS: Record<Difficulty, string> =
  Object.fromEntries(
    DIFFICULTY_OPTIONS.map((o) => [o.value, o.label]),
  ) as Record<Difficulty, string>
