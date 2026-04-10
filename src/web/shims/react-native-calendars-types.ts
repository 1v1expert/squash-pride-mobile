export type MarkedDates = Record<
  string,
  {
    selected?: boolean;
    marked?: boolean;
    events?: unknown;
    [key: string]: unknown;
  }
>;