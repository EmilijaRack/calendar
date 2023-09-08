export class MainCalendarState {
  constructor(weekStartDate) {
    this.weekStartDate = weekStartDate ?? new Date();
  }
}
