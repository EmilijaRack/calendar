import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import useAppState from "../mainCalendarState";
import { isToday } from "../dateHelpers";
import { Renderer } from "../renderer";

const DAYS_IN_A_WEEK = 7;
const HOURS_IN_A_DAY = 24;

type MainCalendarProps = Pick<
  ReturnType<typeof useAppState>,
  "getDisplayDate" | "getEvents"
>;

const MainCalendar = ({ getDisplayDate, getEvents }: MainCalendarProps) => {
  const [rendererRoot, setRendererRoot] = useState<HTMLElement | null>(null);

  const renderer = useMemo(() => {
    if (!rendererRoot) {
      return null;
    }
    return new Renderer(rendererRoot);
  }, [rendererRoot]);

  const weekStartDate = new Date(getDisplayDate().getTime());
  weekStartDate.setDate(getDisplayDate().getDate() - getDisplayDate().getDay());

  const weekEndDate = new Date(getDisplayDate().getTime());
  weekEndDate.setDate(weekEndDate.getDate() + 7 - getDisplayDate().getDay());

  const weekEvents = useMemo(
    () =>
      getEvents().filter((event) => {
        return event.startDate >= weekStartDate && event.endDate <= weekEndDate;
      }),
    [getEvents, getDisplayDate]
  );

  useEffect(() => {
    if (!rendererRoot || !renderer) {
      return;
    }
    renderer.clearEventsFromBoard();

    weekEvents.forEach((event) => renderer.renderEvent(event));

    return () => {
      renderer.clearEventsFromBoard();
    };
  }, [weekEvents, renderer, rendererRoot]);

  return (
    <section className="main-calendar" ref={setRendererRoot}>
      <ul className="main-calendar__header">
        <li className="timeline__cell timeline__cell--flex-end">GMT+03</li>
        <li className="main-calendar__vertical-block--small"></li>
        {new Array(DAYS_IN_A_WEEK).fill({}).map((_, index) => {
          return (
            <li className="week-days__cells" key={index}>
              <p className="week-days__cells--p">
                {new Date(
                  getDisplayDate().getFullYear(),
                  getDisplayDate().getMonth(),
                  getDisplayDate().getDate() - getDisplayDate().getDay() + index
                )
                  .toLocaleString("default", {
                    weekday: "short",
                  })
                  .toLocaleUpperCase()}
              </p>
              <button
                className={`week-days__cells--h1 ${
                  isToday(
                    new Date(
                      getDisplayDate().getFullYear(),
                      getDisplayDate().getMonth(),
                      getDisplayDate().getDate() -
                        getDisplayDate().getDay() +
                        index -
                        1
                    )
                  )
                    ? "current-day-styling"
                    : ""
                } `}
              >
                {new Date(
                  getDisplayDate().getFullYear(),
                  getDisplayDate().getMonth(),
                  getDisplayDate().getDate() - getDisplayDate().getDay() + index
                ).getDate()}
              </button>
            </li>
          );
        })}
      </ul>
      <ul className="main-calendar__body">
        {new Array(HOURS_IN_A_DAY).fill({}).map((_, index_i) => {
          return (
            <Fragment key={index_i}>
              <li className="timeline__cell">
                <p>{index_i + 1} AM</p>
              </li>
              <li className="main-calendar__horizontal-block"></li>
              {new Array(DAYS_IN_A_WEEK).fill({}).map((_, index_j) => {
                return (
                  <li className="main-calendar__body__cells" key={index_j}></li>
                );
              })}
            </Fragment>
          );
        })}
      </ul>
    </section>
  );
};

export default MainCalendar;
