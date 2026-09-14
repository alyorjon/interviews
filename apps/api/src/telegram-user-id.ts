export function parseTelegramUserId(raw: unknown): number | undefined {
  if (typeof raw !== "string" || !/^[1-9]\d*$/.test(raw)) return undefined;
  const value = Number(raw);
  return Number.isSafeInteger(value) ? value : undefined;
}
