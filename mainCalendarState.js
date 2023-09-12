export class MainCalendarState {
  constructor(displayDate, events) {
    this.displayDate = displayDate ?? new Date();
    this.events = events ?? [];
  }

  updateEvents(events) {
    this.events = events;
  }

  addEvent(event) {
    this.events = [...this.events, event];
  }

  removeEvent(id) {
    this.events = this.events.filter((event) => event.id !== id);
  }

  addDisplayWeekOffset(offset) {
    this.displayDate = new Date(
      this.displayDate.getFullYear(),
      this.displayDate.getMonth(),
      this.displayDate.getDate() + offset
    );
  }
}
