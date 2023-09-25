export class Event {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;

  constructor(title?: string, startDate?: Date, endDate?: Date, id?: number) {
    this.id = id ?? Date.now();
    this.title = title ?? "";
    this.startDate = startDate ?? new Date();
    this.endDate = endDate ?? new Date();
  }
}
