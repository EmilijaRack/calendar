import React from "react";
import { SplitEvent } from "./MainCalendar";

const CELL_HEIGHT = 50;

interface Event {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
}

const Event = ({
  event,
  onDeletingEvent,
}: {
  event: SplitEvent;
  onDeletingEvent: (event: Event) => void;
}) => {
  return (
    <div
      className="event"
      style={{
        top: (CELL_HEIGHT * event.displayStartTime.getMinutes()) / 60 + "px",
        height:
          ((event.displayEndTime.getTime() - event.displayStartTime.getTime()) /
            (1000 * 60 * 60)) *
            CELL_HEIGHT +
          "px",
      }}
      onClick={() => onDeletingEvent(event)}
    >
      <p className="event--title">
        {event.title}, {event.startDate.toTimeString().slice(0, 5)} -
        {event.endDate.toTimeString().slice(0, 5)}
      </p>
    </div>
  );
};

export default Event;
