import { Event } from "./event.js";
import { EventModal } from "./eventModal.js";
import { Renderer } from "./renderer.js";
import { createCalendarAPI } from "./localStorage.js";

const root = document.querySelector("#root");
const modalContainer = document.querySelector("#event-modal");
const openModalButton = document.querySelector(".btn-event");
const todayButton = document.querySelector(".btn-date");
const closeModalButton = document.querySelector(".close-btn");
const eventModal = new EventModal(modalContainer);
const localStorageApi = createCalendarAPI({ delay: 0 });
const renderer = new Renderer(root);
openModalButton.addEventListener("click", (event) => {
  event.stopPropagation();
  eventModal.open();
});

eventModal.onSave(function saveEvent(event) {
  return localStorageApi
    .createEvent(event)
    .then(() => {
      renderer.renderEvent(event);
      eventModal.close();
    })
    .catch(() => {
      if (confirm("Failed to save. Try again?")) {
        return saveEvent(event);
      }
    });
});

function loadEvents() {
  return localStorageApi
    .listEvents()
    .then((eventsWithStringsAsDates) => {
      eventsWithStringsAsDates
        .map((event) => ({
          ...event,
          startDate: new Date(event.startDate),
          endDate: new Date(event.endDate),
        }))
        .forEach(renderer.renderEvent.bind(renderer));
    })
    .catch((e) => {
      console.log(e);
      if (confirm("Failed to load. Try again?")) {
        return loadEvents();
      }
    });
}

window.addEventListener("load", loadEvents());

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

renderer.onEventClick((event) => {
  if (confirm("Delete this event?")) {
    deleteEventWhenConfirmed(event);
  }
});

function deleteEventWhenConfirmed(id) {
  return localStorageApi
    .deleteEvent(id)
    .then(renderer.clearEventsFromBoard(), loadEvents())
    .catch((e) => {
      if (confirm("Failed to remove an event. Try again?")) {
        console.log(e);
        return deleteEventWhenConfirmed();
      }
    });
}
