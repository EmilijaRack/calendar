export class Event {
  constructor(title, startDate, endDate) {
    this.id = Date.now();
    this.title = title ?? "";
    this.startDate = startDate ?? new Date();
    this.endDate = endDate ?? new Date();
  }
}
