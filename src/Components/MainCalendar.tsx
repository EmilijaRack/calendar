import React, { Fragment } from "react";
import useAppState from "../mainCalendarState";

const DAYS_IN_A_WEEK = 7;
const HOURS_IN_A_DAY = 24;

type MainCalendarProps = Pick<ReturnType<typeof useAppState>, "getDisplayDate">;

const MainCalendar = ({ getDisplayDate }: MainCalendarProps) => {
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
                  getDisplayDate().getFullYear(),
                  getDisplayDate().getMonth(),
                  getDisplayDate().getDate() - getDisplayDate().getDay() + index
                )
                  .toLocaleString("default", {
                    weekday: "short",
                  })
                  .toLocaleUpperCase()}
              </p>
              <button className="week-days__cells--h1">
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
        {new Array(HOURS_IN_A_DAY).fill({}).map((_, index) => {
          return (
            <Fragment key={index}>
              <li className="timeline__cell">
                <p>{index + 1} AM</p>
              </li>
              <li className="main-calendar__horizontal-block"></li>
              {new Array(DAYS_IN_A_WEEK).fill({}).map((_, index) => {
                return (
                  <li className="main-calendar__body__cells" key={index}></li>
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
