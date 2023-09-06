export class SideCalendarState {
  constructor(
    displayMonthLength,
    prevMonthLength,
    monthStartWeekDay,
    displayDate
  ) {
    this.displayDate = displayDate ?? new Date();
    this.displayMonthLength = displayMonthLength ?? 31;
    this.prevMonthLength = prevMonthLength ?? 31;
    this.monthStartWeekDay = monthStartWeekDay ?? 1;
  }
}
