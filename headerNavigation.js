export class HeaderNavigation {
  constructor() {
    this.currentDateDisplay = document.querySelector(".date");
  }

  displayCurrentDate(state) {
    this.currentDateDisplay.innerHTML = `${state.displayDate.toLocaleString(
      "default",
      { month: "long" }
    )} ${state.displayDate.getFullYear()}`;
  }
}
