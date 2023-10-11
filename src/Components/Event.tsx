import React from "react";
import { useState } from "react";

interface Event {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
}

const Event = (props: Event) => {
  const { id, title, startDate, endDate } = props;

  const [eventProps, setEventProps] = useState({
    id: id ?? Date.now(),
    title: title ?? "",
    startDate: startDate ?? new Date(),
    endDate: endDate ?? new Date(),
  });

  setEventProps({
    id: id ?? Date.now(),
    title: title ?? "",
    startDate: startDate ?? new Date(),
    endDate: endDate,
  });

  return (
    <div className="Event">
      <p>
        {eventProps.title}, {eventProps.startDate.toTimeString().slice(0, 5)} -
        {eventProps.endDate.toTimeString().slice(0, 5)}
      </p>
    </div>
  );
};

export default Event;
