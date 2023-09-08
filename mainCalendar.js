import { MainCalendarState } from "./mainCalendarState.js";
import { isToday } from "./dateHelpers.js";

const PREV = -7;
const NEXT = 7;

export class MainCalendar {
  constructor() {
    this.state = new MainCalendarState();
    this.leftArrowBtn = document.querySelectorAll(".btn-arrow")[0];
    this.rightArrowBtn = document.querySelectorAll(".btn-arrow")[1];
    this.currentDateDisplay = document.querySelector(".date");
    this.days = document.querySelectorAll(".week-days__cells--h1");

    this.leftArrowBtn.addEventListener("click", () => {
      this.updateState(PREV);
      this.initialRender();
      this.onWeekChangeCb(this.state.weekStartDate);
    });

    this.rightArrowBtn.addEventListener("click", () => {
      this.updateState(NEXT);
      this.initialRender();
      this.onWeekChangeCb(this.state.weekStartDate);
    });

    window.addEventListener("load", () => {
      this.initialRender();
    });
  }

  onWeekChange(onWeekChangeCb) {
    this.onWeekChangeCb = onWeekChangeCb;
  }

  initialRender() {
    this.displayCurrentDate();
    this.renderDisplayWeek();
  }

  updateState(direction) {
    this.state = new MainCalendarState(
      new Date(
        this.state.weekStartDate.getFullYear(),
        this.state.weekStartDate.getMonth(),
        this.state.weekStartDate.getDate() + direction
      )
    );
  }

  displayCurrentDate() {
    this.currentDateDisplay.innerHTML = `${this.state.weekStartDate.toLocaleString(
      "default",
      { month: "long" }
    )} ${this.state.weekStartDate.getFullYear()}`;
  }

  addHighlight(element) {
    element.classList.add("current-day-styling");
  }

  removeHighlight(element) {
    element.classList.remove("current-day-styling");
  }

  renderDisplayWeek() {
    for (let i = 0; i < this.days.length; i++) {
      const currentCell = this.days[i];
      const currentDate = new Date(
        this.state.weekStartDate.getFullYear(),
        this.state.weekStartDate.getMonth(),
        this.state.weekStartDate.getDate() -
          this.state.weekStartDate.getDay() +
          i
      );
      currentCell.innerHTML = currentDate.getDate();

      if (isToday(currentDate)) {
        this.addHighlight(currentCell);
      } else {
        this.removeHighlight(currentCell);
      }
    }
  }
}
