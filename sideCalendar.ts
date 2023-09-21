import { isToday, setDate } from "./dateHelpers.js";
import { SideCalendarState } from "./sideCalendarState.js";
import { assertHTMLElement } from "./utils.js";

const MAX_NUMBER_OF_CELLS = 42;

enum NavDirection {
  Prev,
  Next,
}

export class SideCalendar {
  private currentDateDisplay: HTMLElement;
  private cells: NodeListOf<HTMLElement>;
  private state: SideCalendarState;

  constructor(root: HTMLElement) {
    this.currentDateDisplay = assertHTMLElement<HTMLElement>(
      ".current-date",
      root
    );
    this.cells = root.querySelectorAll(".calendar-dates__cell");
    this.state = new SideCalendarState(new Date());

    root
      .querySelector("#side-calendar-left-arrow")
      ?.addEventListener("click", () => {
        this.initialNavigation(NavDirection.Prev);
      });

    root
      .querySelector("#side-calendar-right-arrow")
      ?.addEventListener("click", () => {
        this.initialNavigation(NavDirection.Next);
      });

    window.addEventListener("load", () => {
      this.initialNavigation();
    });
  }

  private initialNavigation(direction?: NavDirection) {
    this.updateDisplayDate(direction);
    this.displayCurrentDate();
    this.renderSideCalendarCells();
  }

  private getDirection(direction?: NavDirection) {
    switch (direction) {
      case NavDirection.Next:
        return 1;
      case NavDirection.Prev:
        return -1;
      default:
        return undefined;
    }
  }

  private updateDisplayDate(direction?: NavDirection) {
    const newDirection = this.getDirection(direction);
    if (this.state && newDirection) {
      this.state = new SideCalendarState(
        new Date(
          this.state.displayDate.getFullYear(),
          this.state.displayDate.getMonth() + newDirection
        )
      );
    }
  }

  private displayCurrentDate() {
    this.currentDateDisplay.innerHTML = `${this.state?.displayDate.toLocaleString(
      "default",
      { month: "long" }
    )} ${this.state?.displayDate.getFullYear()}`;
  }

  private renderCurrentMonthCells() {
    if (this.state && this.cells) {
      for (let i = 1; i <= this.state.displayMonthLength; i++) {
        const currentCell = this.cells[i + this.state.monthStartWeekDay - 1];
        currentCell.innerHTML = i.toString();

        currentCell.classList.remove("calendar-dates__cell--gray");

        if (isToday(setDate(this.state.displayDate, i))) {
          this.addHighlight(currentCell);
        } else {
          this.removeHighlight(currentCell);
        }
      }
    }
  }

  private addHighlight(element: HTMLElement) {
    element.classList.add("current-day-styling");
  }

  private removeHighlight(element: HTMLElement) {
    element.classList.remove("current-day-styling");
  }

  private renderPrevMonthCells() {
    if (this.state && this.cells) {
      for (let i = 0; i < this.state.monthStartWeekDay; i++) {
        const currentCell = this.cells[i];
        currentCell.innerHTML = (
          this.state.prevMonthLength -
          this.state.monthStartWeekDay +
          1 +
          i
        ).toString();

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
  }

  private renderNextMonthCells() {
    if (this.state && this.cells) {
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
        currentCell.innerHTML = i.toString();

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
  }

  private renderSideCalendarCells() {
    this.renderCurrentMonthCells();
    this.renderPrevMonthCells();
    this.renderNextMonthCells();
  }
}
