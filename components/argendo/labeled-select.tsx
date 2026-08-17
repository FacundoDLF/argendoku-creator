"use client"

// Shared UI: DRY wrapper so every labeled dropdown in the toolbar stays identical.

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LabeledSelectProps<T extends string> {
  id: string
  label: string
  value: T
  options: ReadonlyArray<{ value: T; label: string }>
  onValueChange: (value: T) => void
}

export function LabeledSelect<T extends string>({
  id,
  label,
  value,
  options,
  onValueChange,
}: LabeledSelectProps<T>) {
  const items = Object.fromEntries(options.map((o) => [o.value, o.label]))

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-medium uppercase tracking-wide text-amber-50/50"
      >
        {label}
      </label>
      <Select
        items={items}
        value={value}
        onValueChange={(next) => onValueChange(next as T)}
      >
        <SelectTrigger
          id={id}
          className="h-9 w-full border-stone-600 bg-stone-900/60 text-amber-50 hover:bg-stone-900 focus-visible:border-orange-600 focus-visible:ring-orange-700/40 data-[popup-open]:bg-stone-900"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border border-stone-700 bg-stone-800 text-amber-50">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="focus:bg-orange-800/40 focus:text-amber-50 data-[selected]:text-amber-50"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
