export function toDateOrThrow(val: string): Date {
  const date = new Date(val);

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date string: "${val}"`);
  }

  return date;
}
