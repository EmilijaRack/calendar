const CELL_HEIGHT = 50;

export class Renderer {
  constructor(root) {
    this.calendarCells = root.querySelectorAll(".main-calendar__body__cells");
    this.cellArray = new Array(24).fill(0).map(() => new Array(7));
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 7; j++) {
        this.cellArray[i][j] = this.calendarCells[i * 7 + j];
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
    eventDataContainer.style.height = CELL_HEIGHT * eventLength + "px";
    eventDataContainer.style.top =
      (CELL_HEIGHT * event.startDate.getMinutes()) / 60 + "px";
  }
}
