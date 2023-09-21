import { EventModal } from "./eventModal.js";
import { CalendarApi, createCalendarAPI } from "./localStorage.js";
import { MainCalendar } from "./mainCalendar.js";
import { AppState } from "./mainCalendarState.js";
import { HeaderNavigation } from "./headerNavigation.js";
import { SideCalendar } from "./sideCalendar.js";
import { Event } from "./event.js";
import { assertHTMLElement } from "./utils.js";

const modalContainer = assertHTMLElement<HTMLElement>(
  "#event-modal",
  document.documentElement
);
document.querySelector<HTMLElement>("#event-modal");

const eventModal = new EventModal(modalContainer);
const localStorageApi: CalendarApi = createCalendarAPI({ delay: 0 });
const mainCalendarState = new AppState();

const rootElement = assertHTMLElement<HTMLElement>(
  "#root",
  document.documentElement
);

const mainCalendar = new MainCalendar(rootElement, eventModal, localStorageApi);

window.addEventListener("load", async () => {
  await loadEvents();
  render();
});

new SideCalendar(
  assertHTMLElement<HTMLElement>(".left-block", document.documentElement)
);

document.querySelector(".btn-event")?.addEventListener("click", (event) => {
  event.stopPropagation();
  eventModal.open();
});

assertHTMLElement<HTMLElement>(
  ".close-btn",
  document.documentElement
).addEventListener("click", () => eventModal.close());

const headerNavigationRoot = assertHTMLElement<HTMLElement>(
  "#header-navigation-root",
  document.documentElement
);

const headerNavigation = new HeaderNavigation(headerNavigationRoot);

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

function loadEvents(): Promise<void> {
  return localStorageApi
    .listEvents()
    .then((events: Event[]) => {
      mainCalendarState.updateEvents(
        events.map((event: Event) => ({
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
    event.target &&
    !modalContainer?.contains(event.target as Node) &&
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
