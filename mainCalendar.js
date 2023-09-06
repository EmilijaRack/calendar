import { MainCalendarState } from "./mainCalendarState.js";

const ONE_WEEK_LEFT = -7;
const ONE_WEEK_RIGHT = 7;

export class MainCalendar {
  constructor() {
    this.state = new MainCalendarState();
    this.leftArrowBtn = document.querySelectorAll(".btn-arrow")[0];
    this.rightArrowBtn = document.querySelectorAll(".btn-arrow")[1];
    this.currentDateDisplay = document.querySelector(".date");

    this.leftArrowBtn.addEventListener("click", () => {
      this.setNewDateValue(ONE_WEEK_LEFT);
      this.displayCurrentDate();
    });

    this.rightArrowBtn.addEventListener("click", () => {
      this.setNewDateValue(ONE_WEEK_RIGHT);
      this.displayCurrentDate();
    });

    window.addEventListener("load", () => {
      this.displayCurrentDate();
    });
  }

  setNewDateValue(slider) {
    this.state = new MainCalendarState(
      new Date(
        this.state.displayDate.getFullYear(),
        this.state.displayDate.getMonth(),
        this.state.displayDate.getDate() + slider
      )
    );
  }

  displayCurrentDate() {
    this.currentDateDisplay.innerHTML = `${this.state.displayDate.toLocaleString(
      "default",
      { month: "long" }
    )} ${this.state.displayDate.getFullYear()}`;
  }
}
