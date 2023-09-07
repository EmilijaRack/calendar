export class MainCalendarState {
  constructor(displayDate, weekStartDate) {
    this.displayDate = displayDate ?? new Date();
    this.weekStartDate =
      weekStartDate ?? new Date().getDate() - new Date().getDay() + 1;
  }
}
