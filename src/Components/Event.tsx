import { useState } from "react";

interface Event {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
}

const Event = (props: Event) => {
  const { id, title, startDate, endDate } = props;

  const [_, setEventProps] = useState({
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
};

export default Event;
