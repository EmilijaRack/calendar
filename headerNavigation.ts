// import AppState from "./src/mainCalendarState";
import { NavDirection } from "./src/commonTypes.js";
import { assertHTMLElement, unreachable } from "./src/utils.js";

export class HeaderNavigation {
  private currentDateDisplay: HTMLElement;
  private todayButton: HTMLButtonElement;
  private onNavigationChangeCb: (offset: number) => void;

  constructor(root: HTMLElement) {
    this.currentDateDisplay = assertHTMLElement<HTMLElement>(".date", root);
    this.todayButton = assertHTMLElement<HTMLButtonElement>(".btn-date", root);
    this.onNavigationChangeCb = (): void => {};

    assertHTMLElement<HTMLButtonElement>(
      "#top-left-navigation",
      root
    ).addEventListener("click", () => {
      const prev = this.getOffset(NavDirection.Prev);
      this.onNavigationChangeCb && this.onNavigationChangeCb(prev);
    });

    assertHTMLElement<HTMLButtonElement>(
      "#top-right-navigation",
      root
    ).addEventListener("click", () => {
      const next = this.getOffset(NavDirection.Next);
      this.onNavigationChangeCb && this.onNavigationChangeCb(next);
    });

    this.todayButton.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }

  private getOffset(direction: NavDirection) {
    switch (direction) {
      case NavDirection.Next:
        return 7;
      case NavDirection.Prev:
        return -7;
      default:
        unreachable(direction);
    }
  }

  onNavigationChange(onNavigationChangeCb: (offset: number) => void) {
    this.onNavigationChangeCb = onNavigationChangeCb;
  }

  displayCurrentDate(state: any) {
    this.currentDateDisplay.innerHTML = `${state.displayDate.toLocaleString(
      "default",
      { month: "long" }
    )} ${state.displayDate.getFullYear()}`;
  }
}
