import { isToday, setDate } from "./dateHelpers.js";
import { SideCalendarState } from "./sideCalendarState.js";

const MAX_NUMBER_OF_CELLS = 42;
const ONE_MONTH_LEFT = -1;
const ONE_MONTH_RIGHT = 1;

export class SideCalendar {
  constructor(root) {
    this.currentDateDisplay = root.querySelector(".current-date");
    this.cells = root.querySelectorAll(".calendar-dates__cell");
    this.state = new SideCalendarState();

    root
      .querySelector("#side-calendar-left-arrow")
      .addEventListener("click", () => {
        this.initialNavigation(ONE_MONTH_LEFT);
      });

    root
      .querySelector("#side-calendar-right-arrow")
      .addEventListener("click", () => {
        this.initialNavigation(ONE_MONTH_RIGHT);
      });

    window.addEventListener("load", () => {
      this.initialNavigation(0);
    });
  }

  initialNavigation(direction) {
    this.updateDisplayDate(direction);
    this.displayCurrentDate();
    this.renderSideCalendarCells();
  }

  updateDisplayDate(direction) {
    this.state = new SideCalendarState(
      new Date(
        this.state.displayDate.getFullYear(),
        this.state.displayDate.getMonth() + direction
      )
    );
  }

  displayCurrentDate() {
    this.currentDateDisplay.innerHTML = `${this.state.displayDate.toLocaleString(
      "default",
      { month: "long" }
    )} ${this.state.displayDate.getFullYear()}`;
  }

  renderCurrentMonthCells() {
    for (let i = 1; i <= this.state.displayMonthLength; i++) {
      const currentCell = this.cells[i + this.state.monthStartWeekDay - 1];
      currentCell.innerHTML = i;

      currentCell.classList.remove("calendar-dates__cell--gray");

      if (isToday(setDate(this.state.displayDate, i))) {
        this.addHighlight(currentCell);
      } else {
        this.removeHighlight(currentCell);
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
        this.addHighlight(currentCell);
      } else {
        this.removeHighlight(currentCell);
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
      nextMonth.setDate(this.state.displayMonthLength + 1);

      if (isToday(setDate(nextMonth, i))) {
        this.addHighlight(currentCell);
      } else {
        this.removeHighlight(currentCell);
      }
    }
  }

  renderSideCalendarCells() {
    this.renderCurrentMonthCells();
    this.renderPrevMonthCells();
    this.renderNextMonthCells();
  }
}
