import React, { useEffect, useState } from "react";
import Event from "./Event";
import EventModal from "./EventModal";
import Header from "./Header";
import MainCalendar from "./MainCalendar";
import SideCalendar from "./SideCalendar";
import { CalendarAPI } from "../calendarApi";
import { NavDirection } from "../commonTypes";
import useAppState from "../mainCalendarState";

const calendarApi = new CalendarAPI({ delay: 0 });

export const App = () => {
  const [isOpen, setOpen] = useState(false);
  const appFunctions = useAppState();

  const createEvent = (event: Event): Promise<void> => {
    return calendarApi
      .createEvent(event)
      .then(() => appFunctions.addEvent(event))
      .catch(() => {
        if (confirm("Failed to save. Try again?")) {
          return createEvent(event);
        }
      });
  };

  const deleteEvent = (event: Event): Promise<void> => {
    return calendarApi
      .deleteEvent(event.id)
      .then(() => {
        appFunctions.removeEvent(event.id);
      })
      .catch(() => {
        if (confirm("Failed to remove an event. Try again?")) {
          return deleteEvent(event);
        }
      });
  };

  const confirmToDelete = (event: Event) => {
    if (confirm("Do you really want to delete this event?")) {
      deleteEvent(event);
    }
  };

  const loadEvents = (): Promise<void> => {
    return calendarApi
      .listEvents()
      .then((loadedEvents: Event[]) => {
        appFunctions.updateEvents(loadedEvents);
      })
      .catch((e) => {
        console.log(e);
        if (confirm("Failed to load. Try again?")) {
          return loadEvents();
        }
      });
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <>
      <Header
        onPrevClick={() => {
          appFunctions.changeWeek(NavDirection.Prev);
        }}
        onNextClick={() => {
          appFunctions.changeWeek(NavDirection.Next);
        }}
        displayDate={appFunctions.getDisplayDate()}
      />
      <main className="main-block">
        <SideCalendar
          displayDate={appFunctions.getSideCalDisplayDate()}
          onCreateButtonClick={() => setOpen(true)}
          onPrevClick={() => {
            appFunctions.changeMonth(NavDirection.Prev);
          }}
          onNextClick={() => {
            appFunctions.changeMonth(NavDirection.Next);
          }}
        />
        {isOpen ? (
          <EventModal
            onCloseBtnClick={() => setOpen(false)}
            onSaveBtnClick={(event) => {
              setOpen(false);
              createEvent(event);
            }}
          />
        ) : null}

        <MainCalendar
          displayDate={appFunctions.getDisplayDate()}
          weekEvents={appFunctions.getWeekEvents}
          onDeleteEvent={confirmToDelete}
        />
      </main>
    </>
  );
};
