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

function render() {
  mainCalendar.clearBoard();
  headerNavigation.displayCurrentDate(mainCalendarState);
  mainCalendar.renderDisplayWeek(mainCalendarState);

  mainCalendar.renderWeekEvents(
    mainCalendarState.events,
    mainCalendarState.displayDate
  );
}

function loadEvents() {
  return localStorageApi
    .listEvents()
    .then((events) => {
      mainCalendarState.updateEvents(
        events.map((event) => ({

          ...event,
          startDate: new Date(event.startDate),
          endDate: new Date(event.endDate),
        }))
      );
    })
    .catch((e) => {
      console.log(e);
      if (confirm("Failed to load. Try again?")) {
        return loadEvents();
      }
    });
}

document.addEventListener("click", (event) => {
  if (
    !modalContainer.contains(event.target) &&
    event.target !== modalContainer
  ) {
    eventModal.close();
  }
});

mainCalendar.onDeletingEvent((id, event) => {
  mainCalendarState.addDisplayWeekOffset(
    Math.abs(
      mainCalendarState.displayDate.getDate() - event.startDate.getDate()
    )
  );
  mainCalendarState.removeEvent(id);
  mainCalendar.renderWeekEvents(
    mainCalendarState.events,
    mainCalendarState.displayDate
  );
});

mainCalendar.onCreatingEvent((event) => {
  mainCalendarState.addEvent(event);
  mainCalendarState.addDisplayWeekOffset(
    Math.abs(
      mainCalendarState.displayDate.getDate() - event.startDate.getDate()
    )
  );
  headerNavigation.displayCurrentDate(mainCalendarState);
  mainCalendar.renderDisplayWeek(mainCalendarState);
  mainCalendar.renderWeekEvents(mainCalendarState.events, event.startDate);
});
