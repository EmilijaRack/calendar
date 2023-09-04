const CELL_HEIGHT = 50;
const HOURS_IN_A_DAY = 24;
const DAYS_IN_A_WEEK = 7;

export class Renderer {
  constructor(root) {
    this.eventDataContainer = document.createElement("div");
    this.calendarCells = root.querySelectorAll(".main-calendar__body__cells");
    this.cellArray = new Array(HOURS_IN_A_DAY)
      .fill(0)
      .map(() => new Array(DAYS_IN_A_WEEK));
    for (let i = 0; i < HOURS_IN_A_DAY; i++) {
      for (let j = 0; j < DAYS_IN_A_WEEK; j++) {
        this.cellArray[i][j] = this.calendarCells[i * DAYS_IN_A_WEEK + j];
      }
    }
  }

  renderEvent(event) {
    for (let [start, end] of this.calcEventLengthInDays(event)) {
      const eventDataContainer = document.createElement("div");
      eventDataContainer.addEventListener("click", () =>
        this.onEventClickFn(event.id)
      );
      eventDataContainer.setAttribute("class", "event");
      eventDataContainer.innerText = `${event.title}, ${event.startDate
        .toTimeString()
        .slice(0, 5)} - ${event.endDate.toTimeString().slice(0, 5)}`;
      this.setEventStyles(start, end, eventDataContainer);
      this.cellArray[start.getHours()][start.getDay()].appendChild(
        eventDataContainer
      );
    }
  }

  setEventStyles(startDate, endDate, eventDataContainer) {
    eventDataContainer.style.top =
      (CELL_HEIGHT * startDate.getMinutes()) / 60 + "px";
    eventDataContainer.style.height =
      ((endDate - startDate) / (1000 * 60 * 60)) * CELL_HEIGHT + "px";
  }

  calcEventLengthInDays({ startDate, endDate }) {
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

  onEventClick(onEventClickFn) {
    this.onEventClickFn = onEventClickFn;
  }

  clearEventsFromBoard() {
    for (let i = 0; i < HOURS_IN_A_DAY; i++) {
      for (let j = 0; j < DAYS_IN_A_WEEK; j++) {
        this.cellArray[i][j].replaceChildren();
      }
    }
  }
}
