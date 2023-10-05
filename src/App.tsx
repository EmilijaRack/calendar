import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import { assertHTMLElement } from "./utils";
import Header from "./Components/Header";
import SideCalendar from "./Components/SideCalendar";
import useAppState from "./mainCalendarState";
import MainCalendar from "./Components/MainCalendar";
import EventModal from "./Components/EventModal";
import { NavDirection } from "./commonTypes";

const App = () => {
  const [isOpen, setOpen] = useState(false);
  const appFunctions = useAppState({
    displayDate: new Date(),
    displaySideCalDate: new Date(),
    events: [],
  });

  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Header
        onPrevClick={() => {
          appFunctions.addDirection(NavDirection.Prev);
        }}
        onNextClick={() => {
          appFunctions.addDirection(NavDirection.Next);
        }}
        displayDate={`${appFunctions
          .getDisplayDate()
          .toLocaleString("default", { month: "long" })} ${appFunctions
          .getDisplayDate()
          .getFullYear()}`}
      />
      <main className="main-block">
        <SideCalendar
          displayDate={appFunctions.getSideCalDisplayDate()}
          onCreateButtonClick={() => openModal()}
          onPrevClick={() => {
            appFunctions.addSideCalDirection(NavDirection.Prev);
          }}
          onNextClick={() => {
            appFunctions.addSideCalDirection(NavDirection.Next);
          }}
        />
        {isOpen ? <EventModal /> : null}

        <MainCalendar getDisplayDate={appFunctions.getDisplayDate} />
      </main>
    </>
  );
};

const container = assertHTMLElement<HTMLElement>(
  "#root",
  document.documentElement
);
const root = createRoot(container);
root.render(<App />);
