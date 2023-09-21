import { Event } from "./event";

const CELL_HEIGHT = 50;
const HOURS_IN_A_DAY = 24;
const DAYS_IN_A_WEEK = 7;

export class Renderer {
  private calendarCells: NodeListOf<HTMLElement>;
  private cellArray: (HTMLElement | undefined)[][];
  private onEventClickFn: (id: number, event: Event) => void;

  constructor(root: HTMLElement) {
    this.calendarCells = root.querySelectorAll(".main-calendar__body__cells");
    this.cellArray = new Array<HTMLElement[] | undefined>(HOURS_IN_A_DAY)
      .fill(undefined)
      .map(() => new Array<HTMLElement | undefined>(DAYS_IN_A_WEEK));
    for (let i = 0; i < HOURS_IN_A_DAY; i++) {
      for (let j = 0; j < DAYS_IN_A_WEEK; j++) {
        this.cellArray[i][j] = this.calendarCells[i * DAYS_IN_A_WEEK + j];
      }
    }
    this.onEventClickFn = () => {};
  }

  renderEvent(event: Event) {
    if (this.cellArray) {
      for (let [start, end] of this.calcEventRanges(event)) {
        const eventDataContainer = document.createElement("div");
        eventDataContainer.addEventListener("click", () =>
          this.onEventClickFn(event.id, event)
        );
        eventDataContainer.setAttribute("class", "event");
        eventDataContainer.innerText = `${event.title}, ${event.startDate
          .toTimeString()
          .slice(0, 5)} - ${event.endDate.toTimeString().slice(0, 5)}`;
        this.setEventStyles(start, end, eventDataContainer);
        this.cellArray[start.getHours()][start.getDay()]?.appendChild(
          eventDataContainer
        );
      }
    }
  }

  private setEventStyles(
    startDate: Date,
    endDate: Date,
    eventDataContainer: HTMLElement
  ) {
    Object.assign(eventDataContainer.style, {
      top: (CELL_HEIGHT * startDate.getMinutes()) / 60 + "px",
      height:
        ((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)) *
          CELL_HEIGHT +
        "px",
    });
  }

  private calcEventRanges({
    startDate,
    endDate,
  }: {
    startDate: Date;
    endDate: Date;
  }): Date[][] {
    const result = [];
    let eventStart = startDate.getTime();
    let eventEnd = new Date(eventStart).setHours(23, 59, 59, 999);
    while (endDate.getTime() > eventEnd) {
      result.push([new Date(eventStart), new Date(eventEnd)]);
      eventStart = eventEnd + 1;
      eventEnd = new Date(eventStart + 1).setHours(23, 59, 59, 999);
    }
    result.push([new Date(eventStart), endDate]);
    return result;
  }

  onEventClick(onEventClickFn: (id: number, event: Event) => void) {
    this.onEventClickFn = onEventClickFn;
  }

  clearEventsFromBoard() {
    if (this.cellArray) {
      for (let i = 0; i < HOURS_IN_A_DAY; i++) {
        for (let j = 0; j < DAYS_IN_A_WEEK; j++) {
          this.cellArray[i][j]?.replaceChildren();
        }
      }
    }
  }
}
