// SDD: editable-text overrides live in one flat map, keyed by stable ids.
// A missing key means "use the default" — clearing an edit reverts to default.

export type LabelMap = Record<string, string>

/** Stable keys so edits survive renumbering (all keyed by uid or page id). */
export const labelKey = {
  puzzleTitle: (uid: string) => `pt:${uid}`,
  solutionHeading: (pageId: string) => `sh:${pageId}`,
  solutionItem: (uid: string) => `si:${uid}`,
  blankTitle: (pageId: string) => `bt:${pageId}`,
}

export function resolveLabel(
  labels: LabelMap,
  key: string,
  fallback: string,
): string {
  return labels[key] ?? fallback
}
