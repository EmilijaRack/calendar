import { Event } from "./event.js";
import { EventModal } from "./eventModal.js";
import { Renderer } from "./renderer.js";
import { createCalendarAPI } from "./localStorage.js";
import { SideCalendar } from "./sideCalendar.js";
import { MainCalendar } from "./mainCalendar.js";

const root = document.querySelector("#root");
const modalContainer = document.querySelector("#event-modal");
const openModalButton = document.querySelector(".btn-event");
const todayButton = document.querySelector(".btn-date");
const closeModalButton = document.querySelector(".close-btn");
const eventModal = new EventModal(modalContainer);
const localStorageApi = createCalendarAPI({ delay: 0 });
const renderer = new Renderer(root);
const sideCalendar = new SideCalendar();
const mainCalendar = new MainCalendar();

openModalButton.addEventListener("click", (event) => {
  event.stopPropagation();
  eventModal.open();
});

eventModal.onSave((event) => {
  renderer.renderEvent(event);
  eventModal.close();
  return localStorageApi.createEvent(event).catch(() => {
    if (confirm("Failed to save. Try again?")) {
      return onSave(event);
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
