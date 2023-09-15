import { EventModal } from "./eventModal.js";
import { createCalendarAPI } from "./localStorage.js";
import { MainCalendar } from "./mainCalendar.js";
import { AppState } from "./mainCalendarState.js";
import { HeaderNavigation } from "./headerNavigation.js";
import { SideCalendar } from "./sideCalendar.js";

const modalContainer = document.querySelector("#event-modal");
const eventModal = new EventModal(modalContainer);
const localStorageApi = createCalendarAPI({ delay: 0 });
const mainCalendarState = new AppState();
const mainCalendar = new MainCalendar(
  document.querySelector("#root"),
  eventModal,
  localStorageApi
);

window.addEventListener("load", async () => {
  await loadEvents();
  render();
});

new SideCalendar(document.querySelector(".left-block"));

document.querySelector(".btn-event").addEventListener("click", (event) => {
  event.stopPropagation();
  eventModal.open();
});

const headerNavigation = new HeaderNavigation(
  document.querySelector("#header-navigation-root")
);

headerNavigation.onNavigationChange((offset) => {
  mainCalendarState.addDisplayWeekOffset(offset);
  render();
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
