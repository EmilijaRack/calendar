import React, { useEffect, useState, useRef } from "react";
import Header from "./Components/Header";
import SideCalendar from "./Components/SideCalendar";
import useAppState from "./mainCalendarState";
import MainCalendar from "./Components/MainCalendar";
import EventModal from "./Components/EventModal";
import { NavDirection } from "./commonTypes";
import { CalendarAPI } from "./calendarApi";
import Event from "./Components/Event";

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

  const openModal = () => {
    setOpen(true);
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
    console.log("loading");
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
          onCreateButtonClick={openModal}
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
            onSaveBtnClick={() => {
              setOpen(false);
            }}
            onCreateEvent={(event: Event) => {
              createEvent(event);
            }}
          />
        ) : null}

        <MainCalendar
          getDisplayDate={appFunctions.getDisplayDate}
          getEvents={appFunctions.getEvents}
        />
      </main>
    </>
  );
};
