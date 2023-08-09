import { Event } from "./event.js";

export class EventModal {
  constructor(root) {
    this.startTime = document.querySelector(".start-time");
    this.endTime = document.querySelector(".end-time");
    this.eventTitle = document.querySelector(".form-body__add-item");
    this.modalContainer = document.querySelector(".event-modal");
    this.saveBtn = document
      .querySelector(".save")
      .addEventListener("click", () => {
        this.onSaveFn(
          new Event(
            this.eventTitle.value,
            new Date(this.startTime.value),
            new Date(this.endTime.value)
          )
        );
      });
  }

  open() {
    this.modalContainer.style.display = "flex";
  }

  close() {
    this.modalContainer.style.display = "none";
  }

  onSave(onSaveFn) {
    this.onSaveFn = onSaveFn;
  }
}
