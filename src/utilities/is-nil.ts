const isNil = (value?: unknown): boolean =>
  value === null || typeof value === "undefined";

export { isNil };
