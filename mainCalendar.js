import { isToday } from "./dateHelpers.js";
import { Renderer } from "./renderer.js";

export class MainCalendar {
  constructor(root, eventModal, localStorageApi) {
    this.renderer = new Renderer(root);
    this.days = root.querySelectorAll(".week-days__cells--h1");
    this.localStorageApi = localStorageApi;

    window.addEventListener("load", () => {
      this.renderDisplayWeek();
    });

    this.renderer.onEventClick((id, event) => {
      if (confirm("Delete this event?")) {
        this.deleteEventWhenConfirmed(id, event);
      }
    });

    eventModal.onSave((event) => {
      eventModal.close();
      this.createEvent(event);
    });
  }

  addHighlight(element) {
    element.classList.add("current-day-styling");
  }

  removeHighlight(element) {
    element.classList.remove("current-day-styling");
  }

  renderDisplayWeek(state) {
    if (!state) return;

    for (let i = 0; i < this.days.length; i++) {
      const currentCell = this.days[i];

      const currentDate = new Date(
        state.displayDate.getFullYear(),
        state.displayDate.getMonth(),
        state.displayDate.getDate() - state.displayDate.getDay() + i
      );
      currentCell.innerHTML = currentDate.getDate();

      if (isToday(currentDate)) {
        this.addHighlight(currentCell);
      } else {
        this.removeHighlight(currentCell);
      }
    }
  }

  renderWeekEvents(events, newWeekDate) {
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

  deleteEventWhenConfirmed(id, event) {
    return this.localStorageApi
      .deleteEvent(id)
      .then(() => {
        this.renderer.clearEventsFromBoard();
        this.onDeletingEventCb(id, event);
      })
      .catch((e) => {
        if (confirm("Failed to remove an event. Try again?")) {
          console.log(e);
          return this.deleteEventWhenConfirmed(id, event);
        }
      });
  }

  onDeletingEvent(onDeletingEventCb) {
    this.onDeletingEventCb = onDeletingEventCb;
  }

  createEvent(event) {
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

  onCreatingEvent(onCreatingEventCb) {
    this.onCreatingEventCb = onCreatingEventCb;
  }
}
