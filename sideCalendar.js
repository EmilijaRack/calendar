import { isToday, setDate } from "./dateHelpers.js";
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

  renderCurrentMonthCells() {
    for (let i = 1; i <= this.state.displayMonthLength; i++) {
      const currentCell = this.cells[i + this.state.monthStartWeekDay - 1];
      currentCell.innerHTML = i;

      currentCell.classList.remove("calendar-dates__cell--gray");

      if (isToday(setDate(this.state.displayDate, i))) {
        addHighlight(currentCell);
      } else {
        removeHighlight(currentCell);
      }
    }
  }

  addHighlight(element) {
    element.classList.add("current-day-styling");
  }

  removeHighlight(element) {
    element.classList.remove("current-day-styling");
  }

  renderPrevMonthCells() {
    for (let i = 0; i < this.state.monthStartWeekDay; i++) {
      const currentCell = this.cells[i];

      currentCell.innerHTML =
        this.state.prevMonthLength - this.state.monthStartWeekDay + 1 + i;

      currentCell.classList.add("calendar-dates__cell--gray");

      const prevMonth = new Date(this.state.displayDate);
      prevMonth.setDate(0);

      if (isToday(setDate(prevMonth, i))) {
        addHighlight(currentCell);
      } else {
        removeHighlight(currentCell);
      }
    }
  }

  renderNextMonthCells() {
    for (
      let i = 1;
      i <=
      MAX_NUMBER_OF_CELLS -
        this.state.displayMonthLength -
        this.state.monthStartWeekDay;
      i++
    ) {
      const currentCell =
        this.cells[
          i + this.state.displayMonthLength + this.state.monthStartWeekDay - 1
        ];
      currentCell.innerHTML = i;

      currentCell.classList.add("calendar-dates__cell--gray");

      const nextMonth = new Date(this.state.displayDate);
      nextMonth.setDate(this.getCurMonthLength() + 1);

      if (isToday(setDate(nextMonth, i))) {
        addHighlight(currentCell);
      } else {
        removeHighlight(currentCell);
      }
    }
  }

  renderSideCalendarCells() {
    this.renderCurrentMonthCells();
    this.renderPrevMonthCells();
    this.renderNextMonthCells();
  }
}
