export function assertHTMLElement<T>(elem: any): asserts elem is T {
  if (!elem) throw new Error("Not an HTMLElement");
}

export function unreachable(param: never): never {
  throw new Error(param);
}

export function calculateDayDifference(date1: Date, date2: Date): number {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const timeDifference = Math.abs(date2.getTime() - date1.getTime());
  const dayDifference = Math.round(timeDifference / oneDayInMilliseconds);
  return dayDifference;
}
