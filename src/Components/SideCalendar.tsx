import React from "react";
import { isToday, setDate } from "../dateHelpers";
import SideCalendarHeader from "./SideCalendarHeader";
const MAX_NUMBER_OF_CELLS = 42;
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

type SideCalendarProps = {
  displayDate: Date;
  onCreateButtonClick: () => void;
  onPrevClick: () => void;
  onNextClick: () => void;
};

const SideCalendar = ({
  displayDate,
  onCreateButtonClick,
  onPrevClick,
  onNextClick,
}: SideCalendarProps) => {
  const getCurMonthLength = () => {
    const curMonthLength = new Date(
      displayDate.getFullYear(),
      displayDate.getMonth() + 1,
      0
    );
    return curMonthLength.getDate();
  };

  const getPrevMonthLength = () => {
    const prevMonth = new Date(displayDate);
    prevMonth.setDate(0);
    return prevMonth.getDate();
  };

  const getMonthStartWeekDay = () => {
    const monthStartWeekDay = new Date(
      displayDate.getFullYear(),
      displayDate.getMonth(),
      1
    );
    return monthStartWeekDay.getDay();
  };

  return (
    <section className="left-block">
      <section className="left-block__header">
        <button className="btn-event" onClick={onCreateButtonClick}>
          Create Event
        </button>
      </section>
      <section className="left-block__main">
        <SideCalendarHeader
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          displayDate={`${displayDate.toLocaleString("default", {
            month: "long",
          })}
            ${displayDate.getFullYear()}`}
        />
        <section className="calendar-dates">
          <ul className="calendar-dates__cells">
            {WEEKDAYS.map((day, index) => (
              <li className="calendar-dates__cell--gray" key={index}>
                {day}
              </li>
            ))}
            {new Array(getMonthStartWeekDay()).fill({}).map((_, index) => {
              const cellData =
                getPrevMonthLength() - getMonthStartWeekDay() + 1 + index;
              const prevMonth = new Date(displayDate);
              prevMonth.setDate(0);
              return (
                <li
                  className={`calendar-dates__cell calendar-dates__cell--gray ${
                    isToday(setDate(prevMonth, index))
                      ? "current-day-styling"
                      : ""
                  }`}
                  key={cellData}
                >
                  {cellData}
                </li>
              );
            })}
            {new Array(getCurMonthLength()).fill({}).map((_, index) => {
              return (
                <li
                  className={`calendar-dates__cell ${
                    isToday(setDate(displayDate, index + 1))
                      ? "current-day-styling"
                      : ""
                  }`}
                  key={index + 1}
                >
                  {index + 1}
                </li>
              );
            })}
            {new Array(
              MAX_NUMBER_OF_CELLS - getCurMonthLength() - getMonthStartWeekDay()
            )
              .fill({})
              .map((_, index) => {
                const cellData = index + 1;
                const nextMonth = new Date(displayDate);
                nextMonth.setDate(getCurMonthLength() + 1);
                return (
                  <li
                    className={`calendar-dates__cell calendar-dates__cell--gray ${
                      isToday(setDate(nextMonth, index))
                        ? "current-day-styling"
                        : ""
                    }`}
                    key={cellData}
                  >
                    {cellData.toString()}
                  </li>
                );
              })}
          </ul>
        </section>
      </section>
    </section>
  );
};

export default SideCalendar;
