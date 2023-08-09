const mp = new Map();
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

export class Event {
  constructor() {
    this.state = {
      id: Date.now(),
      title: "",
      startDate: new Date("2023-07-11:15:30:00"),
      endDate: new Date("2023-07-11:18:00:00"),
    };
    this.startTime = document.querySelector(".start-time");
    this.endTime = document.querySelector(".end-time");
    this.eventTitle = document.querySelector(".form-body__add-item");
    this.modalContainer = document.querySelector(".event-modal");
    this.saveBtn = document
      .querySelector(".save")
      .addEventListener("click", () => {
        this.updateState();
        console.log(this.state);
        this.renderEvent(this.state);
        this.closeEventModal();
      });
    mp.set(this.state.id, this.state);
    console.log(mp.entries());
  }

  updateState() {
    this.state.id = Date.now();
    this.state.title = this.eventTitle.value;
    this.state.startDate = new Date(this.startTime.value);
    this.state.endDate = new Date(this.endTime.value);
  }

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

  closeEventModal() {
    this.modalContainer.style.display = "none";
  }
}
