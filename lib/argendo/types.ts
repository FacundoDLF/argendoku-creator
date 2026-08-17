// SDD (Schema-Driven Development): domain contracts defined before any UI.

export type Difficulty = "facil" | "medio" | "dificil" | "experto"
export type PaperFormat = "a4" | "a5" | "letter"
export type ColorProfile = "rgb" | "cmyk"
export type PageKind = "puzzle" | "solution"

/** A single generated sudoku with its 81-cell grids. */
export interface Puzzle {
  /** Stable identity: survives reordering/renumbering, used as React key + seed. */
  uid: string
  difficulty: Difficulty
  /** 81 cells, `null` where the player must fill in. */
  given: Array<number | null>
  /** 81 cells, always fully solved. */
  solution: number[]
}

/** A puzzle placed in the book with its 1-based position number. */
export interface PageItem {
  puzzle: Puzzle
  /** 1-based position in the whole book — derived from list order. */
  number: number
}

/** A laid-out sheet in the book (a puzzle sheet or a solutions sheet). */
export interface BookPage {
  id: string
  kind: PageKind
  items: PageItem[]
}

/** Controls that drive the "+ Agregar" action and export layout. */
export interface BookConfig {
  /** Difficulty applied to the next batch of puzzles added. */
  difficulty: Difficulty
  format: PaperFormat
  /** How many puzzles the "+ Agregar" button adds per click. */
  quantity: number
}
