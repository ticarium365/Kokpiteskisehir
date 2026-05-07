export function serializeRow<T extends Record<string, unknown>>(row: T): T {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    out[k] = v instanceof Date ? v.toISOString() : v;
  }
  return out as T;
}

export function serializeRows<T extends Record<string, unknown>>(rows: T[]): T[] {
  return rows.map(serializeRow);
}
