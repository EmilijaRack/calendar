import React, { ChangeEvent } from "react";
import Event from "./Event";
import { getTitleError } from "../errorHandler";

const EventModalTitle = ({
  event,
  setEvent,
}: {
  event: Event;
  setEvent: (event: Event) => void;
}) => {
  return (
    <div className="title">
      <input
        type="text"
        placeholder="Add title"
        className="form-body__add-item"
        value={event.title}
        onChange={(date: ChangeEvent<HTMLInputElement>) => {
          setEvent({ ...event, title: date.target.value });
        }}
      />
      {getTitleError(event.title) && (
        <p className="errorMsg">{getTitleError(event.title)}</p>
      )}
    </div>
  );
};

export default EventModalTitle;
