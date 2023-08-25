const CELL_HEIGHT = 50;
const FULL_DAY_LENGTH = 1200;
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
    const eventDataContainer = document.createElement("div");
    eventDataContainer.setAttribute("class", "event");
    eventDataContainer.innerText = `${
      event.title
    }, ${event.startDate.getHours()}:${
      event.startDate.getMinutes() < 10
        ? "0" + event.startDate.getMinutes()
        : "" + event.startDate.getMinutes()
    } - ${event.endDate.getHours()}:${
      event.endDate.getMinutes() < 10
        ? "0" + event.endDate.getMinutes()
        : "" + event.endDate.getMinutes()
    }`;
    this.cellArray[event.startDate.getHours()][
      event.startDate.getDay()
    ].appendChild(eventDataContainer);
    this.calcEventLength(event, eventDataContainer);
  }

  setEventStyles(eventDataContainer, key, value) {
    eventDataContainer.style[key] = value + "px";
  }

  calcEventLength(event, eventDataContainer) {
    const eventLength = (event.endDate - event.startDate) / (1000 * 60 * 60);
    const offSet = (CELL_HEIGHT * event.startDate.getMinutes()) / 60;
    const fullEventHeight = CELL_HEIGHT * eventLength;
    let temp = fullEventHeight;
    const eventDaysLength = Math.floor(eventLength / HOURS_IN_A_DAY);
    const eventStartLength =
      HOURS_IN_A_DAY -
      ((event.startDate.getHours() * 60 + event.startDate.getMinutes()) *
        60 *
        1000) /
        (1000 * 60 * 60);
    const previousHeight =
      (eventStartLength * FULL_DAY_LENGTH) / HOURS_IN_A_DAY;

    this.setEventStyles(eventDataContainer, "top", offSet);

    if (eventLength <= eventStartLength) {
      this.setEventStyles(eventDataContainer, "height", fullEventHeight);
      return;
    }

    this.setEventStyles(eventDataContainer, "height", previousHeight);
    for (let i = 0; i <= eventDaysLength; i++) {
      const eventDataContainerNextDay = document.createElement("div");
      eventDataContainerNextDay.setAttribute("class", "event");
      if (event.startDate.getDay() + i + 1 != DAYS_IN_A_WEEK) {
        this.cellArray[0][event.startDate.getDay() + i + 1].appendChild(
          eventDataContainerNextDay
        );
      }
      temp -= FULL_DAY_LENGTH;
      if (temp - FULL_DAY_LENGTH < 0) {
        this.setEventStyles(
          eventDataContainerNextDay,
          "height",
          fullEventHeight - previousHeight
        );
        return;
      }
      this.setEventStyles(eventDataContainer, "height", FULL_DAY_LENGTH);
    }
  }
}
