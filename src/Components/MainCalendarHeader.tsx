import React from "react";
import { isToday } from "../dateHelpers";

const DAYS_IN_A_WEEK = 7;

const MainCalendarHeader = ({ displayDate }: { displayDate: Date }) => {
  return (
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
  );
};

export default MainCalendarHeader;
