import { AppStateType } from "./mainCalendarState";

const PREV = -7;
const NEXT = 7;

export class HeaderNavigation {
  private currentDateDisplay: HTMLElement | null;
  private todayButton: HTMLButtonElement | null;
  private onNavigationChangeCb: (offset: number) => void;

  constructor(root: HTMLElement) {
    this.currentDateDisplay = root.querySelector(".date");
    this.todayButton = root.querySelector(".btn-date");
    this.onNavigationChangeCb = (): void => {};

    root
      .querySelector("#top-left-navigation")
      ?.addEventListener("click", () => {
        this.onNavigationChangeCb && this.onNavigationChangeCb(PREV);
      });

    root
      .querySelector("#top-right-navigation")
      ?.addEventListener("click", () => {
        this.onNavigationChangeCb && this.onNavigationChangeCb(NEXT);
      });

    this.todayButton?.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }

  onNavigationChange(onNavigationChangeCb: (offset: number) => void) {
    this.onNavigationChangeCb = onNavigationChangeCb;
  }

  displayCurrentDate(state: AppStateType) {
    this.currentDateDisplay!.innerHTML = `${state.displayDate.toLocaleString(
      "default",
      { month: "long" }
    )} ${state.displayDate.getFullYear()}`;
  }
}
