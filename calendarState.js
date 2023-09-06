export class CalendarState {
  constructor(currentDate, events) {
    this.currentDate = currentDate ?? new Date();
    this.events = events ?? [];
  }
}
