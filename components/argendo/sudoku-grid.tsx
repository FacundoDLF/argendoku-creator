// Shared UI: a single pure 9x9 grid. Numbers scale to the grid via container units.

import { cn } from "@/lib/utils"

interface SudokuGridProps {
  values: Array<number | null>
}

export function SudokuGrid({ values }: SudokuGridProps) {
  return (
    <div className="@container aspect-square w-full">
      <div className="grid size-full grid-cols-9 overflow-hidden border-2 border-paper-line-strong bg-paper">
        {values.map((value, i) => {
          const col = i % 9
          const row = Math.floor(i / 9)
          return (
            <div
              key={i}
              className={cn(
                "flex items-center justify-center border-[0.5px] border-paper-line font-serif font-medium leading-none text-paper-ink text-[6cqi]",
                col % 3 === 0 && col !== 0 && "border-l-2 border-l-paper-line-strong",
                row % 3 === 0 && row !== 0 && "border-t-2 border-t-paper-line-strong",
              )}
            >
              {value ?? ""}
            </div>
          )
        })}
      </div>
    </div>
  )
}
