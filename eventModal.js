import { Event } from "./event.js";

export class EventModal {
  constructor(root) {
    this.root = root;
    this.dateErrorMsg = document.createElement("p");
    this.titleErrorMsg = document.createElement("p");
    this.dateErrorMsg.setAttribute("class", "dateErrorMsg");
    this.titleErrorMsg.setAttribute("class", "titleErrorMsg");
    this.timeContainer = document.querySelector(".time-input");
    this.saveBtn = root.querySelector(".save");
    this.startTime = root.querySelector(".start-time");
    this.endTime = root.querySelector(".end-time");
    this.eventTitle = root.querySelector(".form-body__add-item");

    this.eventTitle.addEventListener("change", () => {
      if (this.isTitleCorrect()) {
        this.eventTitle.classList.remove("noTitleError");
        this.titleErrorMsg.remove();
      }
    });
    this.endTime.addEventListener("change", () => {
      if (this.isTimeCorrect()) {
        this.endTime.classList.remove("endDateError");
        this.dateErrorMsg.remove();
      }
    });
    this.saveBtn.addEventListener("click", () => {
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

    root
      .querySelector(".close-btn")
      .addEventListener("click", () => this.close());
  }

  open() {
    this.eventTitle.classList.remove("noTitleError");
    this.endTime.classList.remove("endDateError");
    this.root.style.display = "flex";
    const currentTime = new Date();
    currentTime.setMinutes(
      currentTime.getMinutes() - currentTime.getTimezoneOffset()
    );
    const endTime = new Date();
    endTime.setMinutes(
      currentTime.getMinutes() + 30 - currentTime.getTimezoneOffset()
    );
    this.eventTitle.value = "";
    this.startTime.value = currentTime.toISOString().slice(0, 16);
    this.endTime.value = endTime.toISOString().slice(0, 16);
  }

  close() {
    this.root.style.display = "none";
  }

  handleFormErrors() {
    if (!this.isTitleCorrect()) {
      this.eventTitle.classList.add("noTitleError");
      this.titleErrorMsg.innerText = "Please, add a Title";
      this.eventTitle.after(this.titleErrorMsg);
    }

    if (!this.isTimeCorrect()) {
      this.endTime.classList.add("endDateError");
      this.dateErrorMsg.innerHTML =
        "The end-date should be later than start-date";
      this.endTime.after(this.dateErrorMsg);
    }
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
