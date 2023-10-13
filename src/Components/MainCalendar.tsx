import React, { Fragment, useMemo } from "react";
import { isToday } from "../dateHelpers";
import { calculateDayDifference } from "../utils";
import Event from "./Event";

const DAYS_IN_A_WEEK = 7;
const HOURS_IN_A_DAY = 24;

const splitEvent = (event: Event): SplitEvent[] => {
  const DAY_START = new Date(event.startDate).setHours(0, 0, 0, 0);
  const DAY_END = new Date(event.startDate).setHours(23, 59, 59, 999);

  const daySpan = calculateDayDifference(event.startDate, event.endDate) + 1;

  return Array.from({ length: daySpan }).map((_, i) => {
    const currentDayStart = new Date(
      new Date(DAY_START).setDate(new Date(DAY_START).getDate() + i)
    );
    const currentDayEnd = new Date(
      new Date(DAY_END).setDate(new Date(DAY_END).getDate() + i)
    );

    const isFirstDay = i === 0;
    const isLastDay = i === daySpan - 1;

    return {
      ...event,
      displayStartTime: isFirstDay ? event.startDate : currentDayStart,
      displayEndTime: isLastDay ? event.endDate : currentDayEnd,
    };
  });
};

export type SplitEvent = Event & {
  displayStartTime: Date;
  displayEndTime: Date;
};

const MainCalendar = ({
  displayDate,
  events,
  onDeletingEvent,
}: {
  displayDate: Date;
  events: Event[];
  onDeletingEvent: (event: Event) => void;
}) => {
  const hoursInADay = useMemo(() => new Array(HOURS_IN_A_DAY).fill({}), []);

  const daysInAWeek = useMemo(() => new Array(DAYS_IN_A_WEEK).fill({}), []);

  const weekStartDate = new Date(displayDate.getTime());
  weekStartDate.setDate(displayDate.getDate() - displayDate.getDay());

  const weekEndDate = new Date(displayDate.getTime());
  weekEndDate.setDate(weekEndDate.getDate() + 6 - displayDate.getDay());

  const weekEvents = useMemo(
    () =>
      events
        .filter((event) => {
          return (
            event.startDate <= weekEndDate && event.endDate >= weekStartDate
          );
        })
        .reduce((acc, event) => {
          return [...acc, ...splitEvent(event)];
        }, [] as SplitEvent[])
        .filter((event) => {
          return (
            event.displayStartTime <= weekEndDate &&
            event.displayEndTime >= weekStartDate
          );
        }),
    [events, displayDate]
  );

  return (
    <section className="main-calendar">
      <ul className="main-calendar__header">
        <li className="timeline__cell timeline__cell--flex-end">GMT+03</li>
        <li className="main-calendar__vertical-block--small"></li>
        {new Array(DAYS_IN_A_WEEK).fill({}).map((_, index) => {
          return (
            <li className="week-days__cells" key={index}>
              <p className="week-days__cells--p">
                {new Date(
                  displayDate.getFullYear(),
                  displayDate.getMonth(),
                  displayDate.getDate() - displayDate.getDay() + index
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
                      displayDate.getFullYear(),
                      displayDate.getMonth(),
                      displayDate.getDate() - displayDate.getDay() + index
                    )
                  )
                    ? "current-day-styling"
                    : ""
                } `}
              >
                {new Date(
                  displayDate.getFullYear(),
                  displayDate.getMonth(),
                  displayDate.getDate() - displayDate.getDay() + index
                ).getDate()}
              </button>
            </li>
          );
        })}
      </ul>
      <ul className="main-calendar__body">
        {hoursInADay.map((_, i) => {
          return (
            <Fragment key={i}>
              <li className="timeline__cell">
                <p>{i + 1} AM</p>
              </li>
              <li className="main-calendar__horizontal-block"></li>
              {daysInAWeek.map((_, j) => {
                return (
                  <li className="main-calendar__body__cells" key={j}>
                    {weekEvents
                      .filter(
                        (weekEvent) =>
                          weekEvent.displayStartTime.getHours() === i &&
                          weekEvent.displayStartTime.getDay() === j
                      )
                      .map((suitableEvent) => (
                        <Event
                          event={suitableEvent}
                          onDeletingEvent={onDeletingEvent}
                          key={suitableEvent.id}
                        />
                      ))}
                  </li>
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
