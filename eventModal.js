import { Event } from "./event.js";

export class EventModal {
  constructor(root) {
    this.root = root;
    this.saveBtn = root.querySelector(".save");
    this.startTime = root.querySelector(".start-time");
    this.endTime = root.querySelector(".end-time");
    this.eventTitle = root.querySelector(".form-body__add-item");
    this.saveBtn.addEventListener("click", () => {
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
    this.root.style.display = "flex";
    const currenTime = new Date();
    currenTime.setMinutes(
      currenTime.getMinutes() - currenTime.getTimezoneOffset()
    );
    this.eventTitle.value = "";
    this.startTime.value = currenTime.toISOString().slice(0, 16);
    this.endTime.value = currenTime.toISOString().slice(0, 16);
  }

  close() {
    this.root.style.display = "none";
  }

  onSave(onSaveFn) {
    this.onSaveFn = onSaveFn;
  }
}
