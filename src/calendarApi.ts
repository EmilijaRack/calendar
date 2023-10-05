import { Event } from "../event.js";

export interface CalendarApi {
  createEvent: (event: Event) => Promise<Event>;
  updateEvent: (id: number, updatedEvent: Event) => Promise<Event>;
  deleteEvent: (id: number) => Promise<void>;
  listEvents: () => Promise<Event[]>;
}

function assertObjectFields<T extends object>(
  obj: T,
  requiredFields: (keyof T)[]
) {
  for (const key of requiredFields) {
    if (obj[key] === undefined) {
      throw new Error("Field does not exist.");
    }
  }
}

export class CalendarAPI implements CalendarApi {
  private delay: number;
  private storageKey: string;

  constructor(config: { delay: number }) {
    this.delay = config.delay;
    this.storageKey = "calendarEvents";
  }

  private getRandomDelay = () => {
    if (Array.isArray(this.delay)) {
      return (
        Math.floor(Math.random() * (this.delay[1] - this.delay[0])) +
        this.delay[0]
      );
    }
    return this.delay;
  };

  private getEvents = (): Event[] => {
    const parsedData = JSON.parse(
      localStorage.getItem(this.storageKey) || "[]"
    );
    const events: Event[] = parsedData.map((parsedEvent: any) => {
      assertObjectFields<Event>(parsedEvent, [
        "id",
        "title",
        "startDate",
        "endDate",
      ]);
      return new Event(
        parsedEvent.title,
        parsedEvent.startDate,
        parsedEvent.endDate,
        parsedEvent.id
      );
    });

    return events;
  };

  private setEvents = (events: Event[]) =>
    localStorage.setItem(this.storageKey, JSON.stringify(events));

  createEvent(event: Event): Promise<Event> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const events = this.getEvents();
        event.id = new Date().getTime();
        events.push(event);
        this.setEvents(events);
        resolve(event);
      }, this.getRandomDelay());
    });
  }

  updateEvent(id: number, updatedEvent: Event): Promise<Event> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const events = this.getEvents();
        const index = events.findIndex((e: Event) => e.id === id);
        if (index !== -1) {
          events[index] = { ...events[index], ...updatedEvent };
          this.setEvents(events);
          resolve(events[index]);
        } else {
          reject("Event not found");
        }
      }, this.getRandomDelay());
    });
  }

  deleteEvent(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const events = this.getEvents();
        const index = events.findIndex((e: Event) => e.id === id);
        if (index !== -1) {
          events.splice(index, 1);
          this.setEvents(events);
          resolve();
        } else {
          reject("Event not found");
        }
      }, this.getRandomDelay());
    });
  }
  listEvents(): Promise<Event[]> {
    return new Promise<Event[]>((resolve) => {
      setTimeout(() => {
        resolve(this.getEvents());
      }, this.getRandomDelay());
    });
  }
}
