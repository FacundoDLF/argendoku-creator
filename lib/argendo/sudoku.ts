// Deterministic sudoku generation: same id -> same puzzle across renders.

import { DIFFICULTY_GIVENS } from "./config"
import type { Difficulty, Puzzle } from "./types"

/** Valid base pattern for a filled sudoku board. */
const pattern = (row: number, col: number) =>
  (3 * (row % 3) + Math.floor(row / 3) + col) % 9

/** Small deterministic PRNG (mulberry32). */
function createRng(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle<T>(input: T[], rng: () => number): T[] {
  const arr = [...input]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function generatePuzzle(id: number, difficulty: Difficulty): Puzzle {
  const rng = createRng(id * 2654435761 + difficulty.length)
  const digits = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], rng)

  const solution: number[] = new Array(81)
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      solution[r * 9 + c] = digits[pattern(r, c)]
    }
  }

  const keep = new Set(
    shuffle([...Array(81).keys()], rng).slice(0, DIFFICULTY_GIVENS[difficulty]),
  )
  const given = solution.map((value, i) => (keep.has(i) ? value : null))

  return { id, difficulty, given, solution }
}
