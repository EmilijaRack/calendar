import { Event } from "./event.js";
import { EventModal } from "./eventModal.js";
import { Renderer } from "./renderer.js";

const root = document.querySelector("#root");
const modalContainer = document.querySelector("#event-modal");
const openModalButton = document.querySelector(".btn-event");
const todayButton = document.querySelector(".btn-date");
const closeModalButton = document.querySelector(".close-btn");
const eventModal = new EventModal(modalContainer);

openModalButton.addEventListener("click", (event) => {
  event.stopPropagation();
  eventModal.open();
});

eventModal.onSave((event) => {
  const renderer = new Renderer(root);
  renderer.renderEvent(event);
  eventModal.close();
  state.saveEvents(event);
});

closeModalButton.addEventListener("click", () => {
  eventModal.close();
});

document.addEventListener("click", (event) => {
  if (
    !modalContainer.contains(event.target) &&
    event.target !== modalContainer
  ) {
    eventModal.close();
  }
});

todayButton.addEventListener("click", (event) => {
  event.stopPropagation();
});

class State {
  constructor() {
    this.currenTime = Date.now();
    this.events = [];
  }
  saveEvents(event) {
    this.events.push(event);
  }
}
const state = new State();
