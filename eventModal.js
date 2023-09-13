import { Event } from "./event.js";

export class EventModal {
  constructor(root) {
    this.root = root;
    this.startTime = root.querySelector(".start-time");
    this.endTime = root.querySelector(".end-time");
    this.eventTitle = root.querySelector(".form-body__add-item");
    this.eventTitle.addEventListener("change", () => {
      if (this.isTitleCorrect()) {
        this.eventTitle.classList.remove("noTitleError");
        this.removeTitleError();
      }
    });
    this.endTime.addEventListener("change", () => {
      if (this.isTimeCorrect()) {
        this.endTime.classList.remove("endDateError");
        this.removeDateError();
      }
    });
    root.querySelector(".save").addEventListener("click", () => {
      if (!this.isFormCorrect()) {
        this.handleFormErrors();
        return;
      }
      this.onSaveFn(
        new Event(
          this.eventTitle.value,
          new Date(this.startTime.value),
          new Date(this.endTime.value)
        )
      );
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
    this.eventTitle.classList.remove("noTitleError");
    this.endTime.classList.remove("endDateError");
    this.root.style.display = "flex";
    const currentTime = new Date();
    const endTime = new Date();
    endTime.setMinutes(currentTime.getMinutes() + 30);
    this.eventTitle.value = "";
    this.startTime.value = dateToString(currentTime);
    this.endTime.value = dateToString(endTime);
  }

  dateToString(date) {
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
      this.eventTitle.classList.add("noTitleError");
      this.titleErrorMsg = this.createError("Please, add a Title");
      this.eventTitle.after(this.titleErrorMsg);
    }

    if (!this.isTimeCorrect() && !this.dateErrorMsg) {
      this.endTime.classList.add("endDateError");
      this.dateErrorMsg = this.createError(
        "The end-date should be later than start-date"
      );
      this.endTime.after(this.dateErrorMsg);
    }
  }

  createError(text) {
    const errorMsg = document.createElement("p");
    errorMsg.classList.add("errorMsg");
    errorMsg.innerText = text;
    return errorMsg;
  }

  isTitleCorrect() {
    return this.eventTitle.value !== "";
  }

  isTimeCorrect() {
    return this.endTime.value >= this.startTime.value;
  }

  isFormCorrect() {
    return this.isTitleCorrect() && this.isTimeCorrect();
  }

  onSave(onSaveFn) {
    this.onSaveFn = onSaveFn;
  }
}
