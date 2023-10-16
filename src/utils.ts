import Event from "./Components/Event";

export function assertHTMLElement<T>(elem: any): asserts elem is T {
  if (!elem) throw new Error("Not an HTMLElement");
}

export function unreachable(param: never): never {
  throw new Error(param);
}

export type SplitEvent = Event & {
  displayStartTime: Date;
  displayEndTime: Date;
};

export function splitEvent(event: Event): SplitEvent[] {
  const DAY_START = new Date(event.startDate).setHours(0, 0, 0, 0);
  const DAY_END = new Date(event.startDate).setHours(23, 59, 59, 999);

  const daySpan = calculateDayDifference(event.startDate, event.endDate) + 1;

  return Array.from({ length: daySpan }).map((_, i) => {
    const currentDayStart = new Date(
      new Date(DAY_START).setDate(new Date(DAY_START).getDate() + i)
    );
    const currentDayEnd = new Date(
      new Date(DAY_END).setDate(new Date(DAY_END).getDate() + i)
    );

    const isFirstDay = i === 0;
    const isLastDay = i === daySpan - 1;

    return {
      ...event,
      displayStartTime: isFirstDay ? event.startDate : currentDayStart,
      displayEndTime: isLastDay ? event.endDate : currentDayEnd,
    };
  });
}

export function calculateDayDifference(date1: Date, date2: Date): number {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const timeDifference = Math.abs(date2.getTime() - date1.getTime());
  const dayDifference = Math.round(timeDifference / oneDayInMilliseconds);
  return dayDifference;
}

export function dateToString(date: Date): string {
  return date.toLocaleString("lt-LT", {
    timeStyle: "short",
    dateStyle: "medium",
  });
}
