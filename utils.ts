import { Event } from "./event.js";

export function assertHTMLElement<T extends Element>(
  element: string,
  root: HTMLElement
): T {
  const elem = root.querySelector<T>(element);
  if (elem) return elem;
  throw new Error("Not an HTMLElement");
}

export function isEventArrayType(events: any): events is Event[] {
  if (!Array.isArray(events)) {
    return false;
  }

  for (const event of events) {
    if ((event as Event).id === undefined) {
      return false;
    }

    if ((event as Event).title === undefined) {
      return false;
    }

    if ((event as Event).startDate === undefined) {
      return false;
    }

    if ((event as Event).endDate === undefined) {
      return false;
    }
  }
  return true;
}

export function unreachable(param: never) {
  throw new Error(param);
}

export enum NavDirection {
  Prev,
  Next,
}
