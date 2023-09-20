import { isToday } from "./dateHelpers.js";
import { Renderer } from "./renderer.js";
import { Event } from "./event.js";
import { EventModal } from "./eventModal.js";
import { AppState } from "./mainCalendarState.js";

export class MainCalendar {
  private renderer: Renderer;
  private days: NodeListOf<HTMLDivElement>;
  private localStorageApi;

  private onDeletingEventCb: (id: number, event: Event) => void = () => {};
  private onCreatingEventCb: (event: Event) => void = () => {};

  constructor(root: HTMLElement, eventModal: EventModal, localStorageApi: any) {
    this.renderer = new Renderer(root);
    this.days = root.querySelectorAll<HTMLDivElement>(".week-days__cells--h1");
    this.localStorageApi = localStorageApi;

    window.addEventListener("load", () => {
      this.renderDisplayWeek();
    });

    this.renderer.onEventClick((id: number, event: Event) => {
      if (confirm("Delete this event?")) {
        this.deleteEventWhenConfirmed(id, event);
      }
    });

    eventModal.onSave((event: Event) => {
      eventModal.close();
      this.createEvent(event);
    });
  }

  addHighlight(element: HTMLElement) {
    element.classList.add("current-day-styling");
  }

  removeHighlight(element: HTMLElement) {
    element.classList.remove("current-day-styling");
  }

  renderDisplayWeek(state?: AppState) {
    if (!state) return;

    for (let i = 0; i < this.days.length; i++) {
      const currentCell = this.days[i];

      const currentDate = new Date(
        state.displayDate.getFullYear(),
        state.displayDate.getMonth(),
        state.displayDate.getDate() - state.displayDate.getDay() + i
      );
      currentCell.innerHTML = currentDate.getDate().toString();

      if (isToday(currentDate)) {
        this.addHighlight(currentCell);
      } else {
        this.removeHighlight(currentCell);
      }
    }
  }

  renderWeekEvents(events: Event[], newWeekDate: Date) {
    const weekStartDate = new Date(newWeekDate.getTime());
    weekStartDate.setDate(newWeekDate.getDate() - newWeekDate.getDay());

    const weekEndDate = new Date(newWeekDate.getTime());
    weekEndDate.setDate(weekEndDate.getDate() + 7 - newWeekDate.getDay());

    events
      .filter(
        (event) =>
          event.startDate >= weekStartDate && event.endDate <= weekEndDate
      )
      .forEach((event) => this.renderer.renderEvent(event));
  }

  clearBoard() {
    this.renderer.clearEventsFromBoard();
  }

  deleteEventWhenConfirmed(id: number, event: Event) {
    return this.localStorageApi
      .deleteEvent(id)
      .then(() => {
        this.renderer.clearEventsFromBoard();
        this.onDeletingEventCb(id, event);
      })
      .catch((e: any) => {
        if (confirm("Failed to remove an event. Try again?")) {
          console.log(e);
          return this.deleteEventWhenConfirmed(id, event);
        }
      });
  }

  onDeletingEvent(onDeletingEventCb: (id: number, event: Event) => void) {
    this.onDeletingEventCb = onDeletingEventCb;
  }

  createEvent(event: Event) {
    return this.localStorageApi
      .createEvent(event)
      .then(() => {
        this.renderer.clearEventsFromBoard();
        this.onCreatingEventCb(event);
      })
      .catch(() => {
        if (confirm("Failed to save. Try again?")) {
          return this.createEvent(event);
        }
      });
  }

  onCreatingEvent(onCreatingEventCb: (event: Event) => void) {
    this.onCreatingEventCb = onCreatingEventCb;
  }
}
