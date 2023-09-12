const PREV = -7;
const NEXT = 7;

export class HeaderNavigation {
  constructor(root) {
    this.currentDateDisplay = root.querySelector(".date");
    this.todayButton = root.querySelector(".btn-date");

    root.querySelector("#top-left-navigation").addEventListener("click", () => {
      this.onNavigationChangeCb && this.onNavigationChangeCb(PREV);
    });

    root
      .querySelector("#top-right-navigation")
      .addEventListener("click", () => {
        this.onNavigationChangeCb && this.onNavigationChangeCb(NEXT);
      });

    this.todayButton.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }

  onNavigationChange(onNavigationChangeCb) {
    this.onNavigationChangeCb = onNavigationChangeCb;
  }

  displayCurrentDate(state) {
    this.currentDateDisplay.innerHTML = `${state.displayDate.toLocaleString(
      "default",
      { month: "long" }
    )} ${state.displayDate.getFullYear()}`;
  }
}
