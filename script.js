import { Event } from "./event.js";
import { EventModal } from "./eventModal.js";
import { Renderer } from "./renderer.js";

const modalContainer = document.getElementsByClassName("event-modal")[0];
const openModalButton = document.getElementsByClassName("btn-event")[0];
const todayButton = document.getElementsByClassName("btn-date")[0];
const closeModalButton = document.querySelector(".close-btn");
const state = {};
const eventModal = new EventModal();

openModalButton.addEventListener("click", (event) => {
  event.stopPropagation();
  eventModal.open();
});

eventModal.onSave((event) => {
  console.log(event);
  const renderer = new Renderer();
  renderer.renderEvent(event);
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
