import { Event } from "./event";

export interface CalendarApi {
  createEvent: (event: Event) => Promise<any>;
  updateEvent: (id: number, updatedEvent: Event) => Promise<any>;
  deleteEvent: (id: number) => Promise<any>;
  listEvents: () => Promise<any[]>;
}

export function createCalendarAPI(config: { delay: number }) {
  const delay = config.delay;

  const getRandomDelay = () => {
    if (Array.isArray(delay)) {
      return Math.floor(Math.random() * (delay[1] - delay[0])) + delay[0];
    }
    return delay;
  };

  const storageKey = "calendarEvents";

  const getEvents = () => JSON.parse(localStorage.getItem(storageKey) || "[]");

  const setEvents = (events: Event[]) =>
    localStorage.setItem(storageKey, JSON.stringify(events));

  return {
    createEvent: (event: Event) =>
      new Promise((resolve) => {
        setTimeout(() => {
          const events = getEvents();
          event.id = new Date().getTime();
          events.push(event);
          setEvents(events);
          resolve(event);
        }, getRandomDelay());
      }),
    updateEvent: (id: number, updatedEvent: Event) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const events = getEvents();
          const index = events.findIndex((e: any) => e.id === id);
          if (index !== -1) {
            events[index] = { ...events[index], ...updatedEvent };
            setEvents(events);
            resolve(events[index]);
          } else {
            reject("Event not found");
          }
        }, getRandomDelay());
      }),
    deleteEvent: (id: number) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const events = getEvents();
          const index = events.findIndex((e: any) => e.id === id);
          if (index !== -1) {
            events.splice(index, 1);
            setEvents(events);
            resolve(true);
          } else {
            reject("Event not found");
          }
        }, getRandomDelay());
      }),
    listEvents: () =>
      new Promise<any[]>((resolve) => {
        setTimeout(() => {
          resolve(getEvents());
        }, getRandomDelay());
      }),
  };
}
