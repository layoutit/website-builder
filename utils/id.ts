export function createId(): string {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();

  return `id-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

export function getIdSeed(seed?: string): string {
  if (!seed) {
    return createId();
  }

  const normalized = seed
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return normalized || createId();
}
