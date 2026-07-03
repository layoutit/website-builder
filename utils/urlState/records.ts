export function hasNonEmptyValues(value: { [key: string]: string }): boolean {
  return Object.values(value).some((entry) => entry.trim().length > 0);
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
