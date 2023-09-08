export class SideCalendarState {
  constructor(displayDate) {
    this.displayDate = displayDate ?? new Date();
    this.displayMonthLength = this.getCurMonthLength();
    this.prevMonthLength = this.getPrevMonthLength();
    this.monthStartWeekDay = this.getMonthStartWeekDay();
  }

  getCurMonthLength() {
    const curMonthLength = new Date(
      this.displayDate.getFullYear(),
      this.displayDate.getMonth() + 1,
      0
    );
    return curMonthLength.getDate();
  }

  getPrevMonthLength() {
    const prevMonth = new Date(this.displayDate);
    prevMonth.setDate(0);
    return prevMonth.getDate();
  }

  getMonthStartWeekDay() {
    const monthStartWeekDay = new Date(
      this.displayDate.getFullYear(),
      this.displayDate.getMonth(),
      1
    );
    return monthStartWeekDay.getDay();
  }
}
