import { MainCalendarState } from "./mainCalendarState.js";

export class MainCalendar {
  constructor() {
    this.state = new MainCalendarState();
    this.leftArrowBtn = document.querySelectorAll(".btn-arrow")[0];
    this.rightArrowBtn = document.querySelectorAll(".btn-arrow")[1];
    this.currentDateDisplay = document.querySelector(".date");

    this.leftArrowBtn.addEventListener("click", () => {});

    this.rightArrowBtn.addEventListener("click", () => {});

    window.addEventListener("load", () => {
      this.displayCurrentDate();
    });
  }

  displayCurrentDate() {
    this.currentDateDisplay.innerHTML = `${this.state.displayDate.toLocaleString(
      "default",
      { month: "long" }
    )} ${this.state.displayDate.getFullYear()}`;
  }
}
