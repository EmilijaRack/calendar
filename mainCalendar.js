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
      this.handleNavigation();
    });

    this.rightArrowBtn.addEventListener("click", () => {
      this.updateState(NEXT);
      this.handleNavigation();
    });

    window.addEventListener("load", () => {
      this.handleNavigation();
    });
  }

  handleNavigation() {
    this.displayCurrentDate();
    this.renderDisplayWeek();
  }

  updateState(direction) {
    this.state = new MainCalendarState(
      new Date(
        this.state.displayDate.getFullYear(),
        this.state.displayDate.getMonth(),
        this.state.displayDate.getDate() + direction
      ),
      new Date(
        this.state.displayDate.getFullYear(),
        this.state.displayDate.getMonth(),
        this.state.displayDate.getDate() + direction - new Date().getDay()
      ).getDate()
    );
  }

  displayCurrentDate() {
    this.currentDateDisplay.innerHTML = `${this.state.displayDate.toLocaleString(
      "default",
      { month: "long" }
    )} ${this.state.displayDate.getFullYear()}`;
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
      const currentDate = new Date(this.state.displayDate);
      currentDate.setDate(this.state.weekStartDate + i);
      currentCell.innerHTML = currentDate.getDate();

      if (isToday(currentDate)) {
        this.addHighlight(currentCell);
      } else {
        this.removeHighlight(currentCell);
      }
    }
  }
}
