// SDD (Schema-Driven Development): domain contracts defined before any UI.

export type Difficulty = "facil" | "medio" | "dificil" | "experto"
export type PaperFormat = "a4" | "a5" | "letter"
export type ColorProfile = "rgb" | "cmyk"
export type PageKind = "puzzle" | "solution"
export type WorkMode = "juego" | "creacion"

/** A single generated sudoku with its 81-cell grids. */
export interface Puzzle {
  id: number
  difficulty: Difficulty
  /** 81 cells, `null` where the player must fill in. */
  given: Array<number | null>
  /** 81 cells, always fully solved. */
  solution: number[]
}

/** A laid-out sheet in the book (a puzzle sheet or a solutions sheet). */
export interface BookPage {
  id: string
  kind: PageKind
  puzzles: Puzzle[]
}

/** Global export/book configuration held in app state. */
export interface BookConfig {
  difficulty: Difficulty
  format: PaperFormat
  quantity: number
}
