import { Event } from "./event.js";

export class EventModal {
  private root: HTMLElement;
  private startTime?: HTMLInputElement;
  private endTime?: HTMLInputElement;
  private eventTitle?: HTMLInputElement;
  private onSaveFn: (event: Event) => void = () => {};
  private dateErrorMsg?: HTMLElement;
  private titleErrorMsg?: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;

    const startTime = root.querySelector<HTMLInputElement>(".start-time");
    if (startTime) {
      this.startTime = startTime;
    }

    const endTime = root.querySelector<HTMLInputElement>(".end-time");
    if (endTime) {
      this.endTime = endTime;
    }

    const eventTitle = root.querySelector<HTMLInputElement>(
      ".form-body__add-item"
    );
    if (eventTitle) {
      this.eventTitle = eventTitle;
    }

    this.eventTitle?.addEventListener("change", () => {
      if (this.isTitleCorrect()) {
        this.eventTitle?.classList.remove("noTitleError");
        this.removeTitleError();
      }
    });
    this.endTime?.addEventListener("change", () => {
      if (this.isTimeCorrect()) {
        this.endTime?.classList.remove("endDateError");
        this.removeDateError();
      }
    });
    root.querySelector(".save")?.addEventListener("click", () => {
      if (!this.isFormCorrect()) {
        this.handleFormErrors();
        return;
      }
      if (this.eventTitle && this.startTime && this.endTime) {
        this.onSaveFn(
          new Event(
            this.eventTitle.value,
            new Date(this.startTime.value),
            new Date(this.endTime.value)
          )
        );
      }
    });
  }

  removeDateError() {
    this.dateErrorMsg && this.dateErrorMsg.remove();
    this.dateErrorMsg = undefined;
  }

  removeTitleError() {
    this.titleErrorMsg && this.titleErrorMsg.remove();
    this.titleErrorMsg = undefined;
  }

  open() {
    this.eventTitle?.classList.remove("noTitleError");
    this.endTime?.classList.remove("endDateError");
    this.root.style.display = "flex";
    const currentTime = new Date();
    const endTime = new Date();
    endTime.setMinutes(currentTime.getMinutes() + 30);
    if (this.eventTitle && this.startTime && this.endTime) {
      this.eventTitle.value = "";
      this.startTime.value = this.dateToString(currentTime);
      this.endTime.value = this.dateToString(endTime);
    }
  }

  dateToString(date: Date): string {
    return date.toLocaleString("lt-LT", {
      timeStyle: "short",
      dateStyle: "medium",
    });
  }

  close() {
    this.root.style.display = "none";
    this.removeDateError();
    this.removeTitleError();
  }

  handleFormErrors() {
    if (!this.isTitleCorrect() && !this.titleErrorMsg) {
      this.eventTitle?.classList.add("noTitleError");
      this.titleErrorMsg = this.createError("Please, add a Title");
      this.eventTitle?.after(this.titleErrorMsg);
    }

    if (!this.isTimeCorrect() && !this.dateErrorMsg) {
      this.endTime?.classList.add("endDateError");
      this.dateErrorMsg = this.createError(
        "The end-date should be later than start-date"
      );
      this.endTime?.after(this.dateErrorMsg);
    }
  }

  createError(text: string) {
    const errorMsg = document.createElement("p");
    errorMsg.classList.add("errorMsg");
    errorMsg.innerText = text;
    return errorMsg;
  }

  isTitleCorrect() {
    if (this.eventTitle) {
      return this.eventTitle.value !== "";
    }
  }

  isTimeCorrect() {
    if (this.endTime && this.startTime) {
      return this.endTime?.value >= this.startTime?.value;
    }
  }

  isFormCorrect() {
    return this.isTitleCorrect() && this.isTimeCorrect();
  }

  onSave(onSaveFn: (event: Event) => void) {
    this.onSaveFn = onSaveFn;
  }
}
