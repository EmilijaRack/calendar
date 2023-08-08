import { EventModal } from "./eventModal.js";

const modalContainer = document.getElementsByClassName("event-modal")[0];
const openModalButton = document.getElementsByClassName("btn-event")[0];
const todayButton = document.getElementsByClassName("btn-date")[0];
const closeModalButton = document.querySelector(".close-btn");
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
  renderEvent(eventData);
});

openModalButton.addEventListener("click", (event) => {
  modalContainer.style.display = "flex";
  event.stopPropagation();
});

closeModalButton.addEventListener("click", () => {
  modalContainer.style.display = "none";
});

document.addEventListener("click", (event) => {
  if (
    !modalContainer.contains(event.target) &&
    event.target !== modalContainer
  ) {
    modalContainer.style.display = "none";
  }
});

todayButton.addEventListener("click", (event) => {
  event.stopPropagation();
});

const eventData = {
  id: Date.now(),
  title: "L",
  startDate: new Date("2023-07-11:15:30:00"),
  endDate: new Date("2023-07-11:16:00:00"),
};

const renderEvent = (event) => {
  const eventDataContainer = document.createElement("div");
  eventDataContainer.setAttribute("class", "event");
  eventDataContainer.innerText = `${event.title} ${event.startDate.getHours()}`;
  cellArray[event.startDate.getHours()][event.startDate.getDay()].appendChild(
    eventDataContainer
  );
  const eventLength = (event.endDate - event.startDate) / (1000 * 60 * 60);
  eventDataContainer.style.height = CELL_HEIGHT * eventLength + "px";
  eventDataContainer.style.top =
    (CELL_HEIGHT * event.startDate.getMinutes()) / 60 + "px";
};

// const eventObj = new EventModal(eventData);
// console.log(eventObj.updateState());
