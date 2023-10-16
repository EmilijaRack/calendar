import React, { ChangeEvent } from "react";
import { dateToString } from "../utils";
import Event from "./Event";
import { getTimeError } from "../errorHandler";

const EventModalTimeInput = ({
  event,
  setEvent,
}: {
  event: Event;
  setEvent: (event: Event) => void;
}) => {
  return (
    <div className="time-input">
      <input
        type="datetime-local"
        className="simple-btn start-time"
        onChange={(date: ChangeEvent<HTMLInputElement>) => {
          setEvent({
            ...event,
            startDate: new Date(date.target.value),
          });
        }}
        value={dateToString(event.startDate)}
      />
      <input
        type="datetime-local"
        className={`simple-btn end-time`}
        value={dateToString(event.endDate)}
        onChange={(date: ChangeEvent<HTMLInputElement>) => {
          setEvent({
            ...event,
            endDate: new Date(date.target.value),
          });
        }}
      />
      {getTimeError({
        endTime: new Date(event.endDate),
        startTime: new Date(event.startDate),
      }) && (
        <p className="errorMsg">
          {getTimeError({
            endTime: new Date(event.endDate),
            startTime: new Date(event.startDate),
          })}
        </p>
      )}
    </div>
  );
};

export default EventModalTimeInput;
