import { EventModal } from "./eventModal.js";
import { createCalendarAPI } from "./localStorage.js";
import { SideCalendar } from "./sideCalendar.js";
import { MainCalendar } from "./mainCalendar.js";
import { HeaderNavigation } from "./headerNavigation.js";
import { MainCalendarState } from "./mainCalendarState.js";

const modalContainer = document.querySelector("#event-modal");
const eventModal = new EventModal(modalContainer);
const localStorageApi = createCalendarAPI({ delay: 0 });
const sideCalendar = new SideCalendar(document.querySelector(".left-block"));
const mainCalendarState = new MainCalendarState();
const mainCalendar = new MainCalendar(
  document.querySelector("#root"),
  eventModal
);
const headerNavigation = new HeaderNavigation(
  document.querySelector("#header-navigation-root")
);

window.addEventListener("load", async () => {
  await loadEvents();
  render(0);
});

headerNavigation.onNavigationChange((offset) => {
  mainCalendarState.addDisplayWeekOffset(offset);
  render();
});

document.querySelector(".btn-event").addEventListener("click", (event) => {
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

// eventModal.onSave((event) => {
//   eventModal.close();
//   eventModal.hadleSubmit(event);
//   return localStorageApi
//     .createEvent(event)
//     .then(() => {
//       mainCalendarState.addEvent(event);
//       mainCalendar.createEvent();
//       mainCalendar.renderWeekEvents(mainCalendarState.events, event.startDate);
//     })
//     .catch(() => {
//       if (confirm("Failed to save. Try again?")) {
//         return onSave(event);
//       }
//     });
// });

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
        return loadEvents(newWeekDate);
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

mainCalendar.onDeletingEvent((id) => {
  mainCalendarState.removeEvent(id);
  mainCalendar.renderWeekEvents(
    mainCalendarState.events,
    mainCalendarState.displayDate
  );
});

mainCalendar.onCreatingEvent((event) => {
  mainCalendarState.addEvent(event);
  mainCalendar.renderWeekEvents(mainCalendarState.events, event.startDate);
});

// function deleteEventWhenConfirmed(id) {
//   return localStorageApi
//     .deleteEvent(id)
//     .then(() => {
//       mainCalendar.deleteEvent();
//       mainCalendarState.removeEvent(id);
//       mainCalendar.renderWeekEvents(
//         mainCalendarState.events,
//         mainCalendarState.displayDate
//       );
//     })
//     .catch((e) => {
//       if (confirm("Failed to remove an event. Try again?")) {
//         console.log(e);
//         return deleteEventWhenConfirmed();
//       }
//     });
// }
