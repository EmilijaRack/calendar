import { Event } from "./event";

export interface CalendarApi {
  createEvent: (event: Event) => Promise<Event>;
  updateEvent: (id: number, updatedEvent: Event) => Promise<Event>;
  deleteEvent: (id: number) => Promise<void>;
  listEvents: () => Promise<Event[]>;
}

export function createCalendarAPI(config: { delay: number }): CalendarApi {
  const delay = config.delay;

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
    const events = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
    if (isCustomObjectType<Event[]>(events)) {
      return events;
    } else throw new Error("Not an Event type");
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
