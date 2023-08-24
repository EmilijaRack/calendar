const CELL_HEIGHT = 50;
const FULL_DAY_LENGTH = 1200;
const HOURS_IN_A_DAY = 24;
const DAYS_IN_A_WEEK = 7;

export class Renderer {
  constructor(root) {
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

    const eventLength = (event.endDate - event.startDate) / (1000 * 60 * 60);
    const dayFitLength = HOURS_IN_A_DAY - event.startDate.getHours();
    const offSet = (CELL_HEIGHT * event.startDate.getMinutes()) / 60;
    const fullEventHeight = CELL_HEIGHT * eventLength;
    eventDataContainer.style.top = offSet + "px";
    if (eventLength <= dayFitLength) {
      eventDataContainer.style.height = fullEventHeight + "px";
    } else {
      let previousHeight =
        (dayFitLength * FULL_DAY_LENGTH) / HOURS_IN_A_DAY - offSet;
      eventDataContainer.style.height = previousHeight + "px";
      for (let i = 1; i <= Math.floor(eventLength / HOURS_IN_A_DAY); i++) {
        const eventDataContainerNextDay = document.createElement("div");
        eventDataContainerNextDay.setAttribute("class", "event");
        this.cellArray[0][event.startDate.getDay() + i].appendChild(
          eventDataContainerNextDay
        );
        if (i === Math.floor(eventLength / HOURS_IN_A_DAY)) {
          eventDataContainerNextDay.style.height =
            FULL_DAY_LENGTH - previousHeight + offSet + "px";
        } else {
          eventDataContainerNextDay.style.height = FULL_DAY_LENGTH + "px";
        }
      }
    }
  }
}
