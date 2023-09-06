import { SideCalendarState } from "./sideCalendarState.js";

const MAX_NUMBER_OF_CELLS = 42;
const ONE_MONT_LEFT = -1;
const ONE_MONTH_RIGHT = 1;

export class SideCalendar {
  constructor() {
    this.currentDateDisplay = document.querySelector(".current-date");
    this.leftArrowBtn = document.querySelectorAll(".btn-arrow")[2];
    this.rightArrowBtn = document.querySelectorAll(".btn-arrow")[3];
    this.cells = document.querySelectorAll(".calendar-dates__cell");
    this.state = new SideCalendarState();

    this.leftArrowBtn.addEventListener("click", () => {
      this.updateDisplayDate(ONE_MONT_LEFT);
      this.updateSideCalendarState();
      this.displayCurrentDate();
      this.renderSideCalendarCells();
    });

    this.rightArrowBtn.addEventListener("click", () => {
      this.updateDisplayDate(ONE_MONTH_RIGHT);
      this.updateSideCalendarState();
      this.displayCurrentDate();
      this.renderSideCalendarCells();
    });

    window.addEventListener("load", () => {
      this.displayCurrentDate();
      this.updateSideCalendarState();
      this.renderSideCalendarCells();
    });
  }
  updateDisplayDate(slider) {
    this.state = new SideCalendarState(
      this.state.displayMonthLength,
      this.state.prevMonthLength,
      this.state.monthStartWeekDay,
      new Date(
        this.state.displayDate.getFullYear(),
        this.state.displayDate.getMonth() + slider
      )
    );
  }

  displayCurrentDate() {
    this.currentDateDisplay.innerHTML = `${this.state.displayDate.toLocaleString(
      "default",
      { month: "long" }
    )} ${this.state.displayDate.getFullYear()}`;
  }

  getCurMonthLength() {
    const curMonthLength = new Date(
      this.state.displayDate.getFullYear(),
      this.state.displayDate.getMonth(),
      0
    );
    return curMonthLength.getDate();
  }

  getPrevMonthLength() {
    const prevMonth = new Date(this.state.displayDate);
    prevMonth.setDate(0);
    return prevMonth.getDate();
  }

  getMonthStartWeekDay() {
    const monthStartWeekDay = new Date(
      this.state.displayDate.getFullYear(),
      this.state.displayDate.getMonth(),
      1
    );
    return monthStartWeekDay.getDay();
  }

  updateSideCalendarState() {
    this.state = new SideCalendarState(
      this.getCurMonthLength(),
      this.getPrevMonthLength(),
      this.getMonthStartWeekDay(),
      this.state.displayDate
    );
  }

  renderCurrentMonthCells(today) {
    for (let i = 1; i <= this.state.displayMonthLength; i++) {
      this.cells[i + this.state.monthStartWeekDay - 1].innerHTML = i;

      this.cells[i + this.state.monthStartWeekDay - 1].classList.remove(
        "calendar-dates__cell--gray"
      );

      if (
        i === today.getDate() &&
        this.state.displayDate.getMonth() === today.getMonth() &&
        this.state.displayDate.getFullYear() === today.getFullYear()
      ) {
        this.cells[i + this.state.monthStartWeekDay - 1].classList.add(
          "current-day-styling"
        );
      } else {
        this.cells[i + this.state.monthStartWeekDay - 1].classList.remove(
          "current-day-styling"
        );
      }
    }
  }

  renderPrevMonthCells(today) {
    for (let i = 0; i < this.state.monthStartWeekDay; i++) {
      this.cells[i].innerHTML =
        this.state.prevMonthLength - this.state.monthStartWeekDay + 1 + i;

      this.cells[i].classList.add("calendar-dates__cell--gray");

      const prevMonth = new Date(this.state.displayDate);
      prevMonth.setDate(0);
      if (
        i === today.getDate() &&
        prevMonth.getMonth() === today.getMonth() &&
        prevMonth.getFullYear() === today.getFullYear()
      ) {
        this.cells[i].classList.add("current-day-styling");
      } else {
        this.cells[i].classList.remove("current-day-styling");
      }
    }
  }

  renderNextMonthCells(today) {
    for (
      let i = 1;
      i <=
      MAX_NUMBER_OF_CELLS -
        this.state.displayMonthLength -
        this.state.monthStartWeekDay;
      i++
    ) {
      this.cells[
        i + this.state.displayMonthLength + this.state.monthStartWeekDay - 1
      ].innerHTML = i;

      this.cells[
        i + this.state.displayMonthLength + this.state.monthStartWeekDay - 1
      ].classList.add("calendar-dates__cell--gray");

      const nextMonth = new Date(this.state.displayDate);
      nextMonth.setDate(this.getCurMonthLength() + 1);
      if (
        i === today.getDate() &&
        nextMonth.getMonth() === today.getMonth() &&
        nextMonth.getFullYear() === today.getFullYear()
      ) {
        this.cells[
          i + this.state.displayMonthLength + this.state.monthStartWeekDay - 1
        ].classList.add("current-day-styling");
      } else {
        this.cells[
          i + this.state.displayMonthLength + this.state.monthStartWeekDay - 1
        ].classList.remove("current-day-styling");
      }
    }
  }

  renderSideCalendarCells() {
    const today = new Date();
    this.renderCurrentMonthCells(today);
    this.renderPrevMonthCells(today);
    this.renderNextMonthCells(today);
  }
}
