import { Event } from "./event.js";

const modalContainer = document.getElementsByClassName("event-modal")[0];
const openModalButton = document.getElementsByClassName("btn-event")[0];
const todayButton = document.getElementsByClassName("btn-date")[0];
const closeModalButton = document.querySelector(".close-btn");

openModalButton.addEventListener("click", (event) => {
  modalContainer.style.display = "flex";
  event.stopPropagation();
  const eventObj = new Event();
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
