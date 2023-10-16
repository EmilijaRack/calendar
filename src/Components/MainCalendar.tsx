import React, { Fragment } from "react";
import Event from "./Event";
import MainCalendarHeader from "./MainCalendarHeader";

const DAYS_IN_A_WEEK = 7;
const HOURS_IN_A_DAY = 24;
const MAIN_CALENDAR_COLUMNS = Array.from({ length: HOURS_IN_A_DAY });
const MAIN_CALENDAR_ROWS = Array.from({ length: DAYS_IN_A_WEEK });

export type SplitEvent = Event & {
  displayStartTime: Date;
  displayEndTime: Date;
};

const MainCalendar = ({
  displayDate,
  weekEvents,
  onDeleteEvent,
}: {
  displayDate: Date;
  weekEvents: SplitEvent[];
  onDeleteEvent: (event: Event) => void;
}) => {
  return (
    <section className="main-calendar">
      <MainCalendarHeader displayDate={displayDate} />
      <ul className="main-calendar__body">
        {MAIN_CALENDAR_COLUMNS.map((_, i) => {
          return (
            <Fragment key={i}>
              <li className="timeline__cell">
                <p>{i + 1} AM</p>
              </li>
              <li className="main-calendar__horizontal-block"></li>
              {MAIN_CALENDAR_ROWS.map((_, j) => {
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
                          onDeletingEvent={onDeleteEvent}
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
