import { Event } from "./event";

export interface AppStateType {
  displayDate: Date;
  events: Event[];
}

export class AppState implements AppStateType {
  displayDate: Date;
  events: Event[];

  constructor(displayDate?: Date, events?: Event[]) {
    this.displayDate = displayDate ?? new Date();
    this.events = events ?? [];
  }

  updateEvents(events: Event[]) {
    this.events = events;
  }

  addEvent(event: Event) {
    this.events = [...this.events, event];
  }

  removeEvent(id: number) {
    this.events = this.events.filter((event) => event.id !== id);
  }

  addDisplayWeekOffset(offset: number) {
    this.displayDate = new Date(
      this.displayDate.getFullYear(),
      this.displayDate.getMonth(),
      this.displayDate.getDate() + offset
    );
  }
}
