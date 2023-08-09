const calendarCells = document.querySelectorAll(".main-calendar__body__cells");
const CELL_HEIGHT = 50;
let cellArray = new Array(24).fill(0).map(() => {
  return new Array(7);
});
window.addEventListener("load", (event) => {
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 7; j++) {
      cellArray[i][j] = calendarCells[i * 7 + j];
    }
  }
});

export class Renderer {
  constructor() {}
  renderEvent(event) {
    const eventDataContainer = document.createElement("div");
    eventDataContainer.setAttribute("class", "event");
    eventDataContainer.innerText = `${
      event.title
    }, ${event.startDate.getHours()}`;
    cellArray[event.startDate.getHours()][event.startDate.getDay()].appendChild(
      eventDataContainer
    );
    const eventLength = (event.endDate - event.startDate) / (1000 * 60 * 60);
    eventDataContainer.style.height = CELL_HEIGHT * eventLength + "px";
    eventDataContainer.style.top =
      (CELL_HEIGHT * event.startDate.getMinutes()) / 60 + "px";
  }
}
