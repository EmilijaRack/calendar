import React from "react";
import { ChangeEvent, useState } from "react";
import { getTitleError, getTimeError } from "../errorHandler";
import Event from "./Event";

const dateToString = (date: Date): string => {
  return date.toLocaleString("lt-LT", {
    timeStyle: "short",
    dateStyle: "medium",
  });
};

const EventModal = ({
  onCloseBtnClick,
  onSaveBtnClick,
}: {
  onCloseBtnClick: () => void;
  onSaveBtnClick: (event: Event) => void;
}) => {
  // TODO: do not duplicate state
  const [title, setTitle] = useState("");

  const [startDateInputValue, setStartDateInputValue] = useState(new Date());

  const [endDateInputValue, setEndDateInputValue] = useState(() => {
    const endDate = new Date();
    endDate.setMinutes(new Date().getMinutes() + 30);
    return dateToString(endDate);
  });

  const [event, setEvent] = useState<Event>({
    id: Date.now(),
    title: "new Title",
    startDate: new Date(startDateInputValue),
    endDate: new Date(endDateInputValue),
  });

  // TODO: Breakup into multiple components
  return (
    <section className="event-modal" id="event-modal">
      <form
        className="event-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (
            !getTitleError(title) &&
            !getTimeError({
              endTime: new Date(endDateInputValue),
              startTime: new Date(startDateInputValue),
            })
          ) {
            onSaveBtnClick(event);
          }
        }}
      >
        <section className="form-header">
          <button
            type="button"
            className="material-symbols-outlined close-btn"
            onClick={() => {
              onCloseBtnClick();
            }}
          >
            close
          </button>
        </section>
        <section className="form-body">
          <span className="form-body__icons"></span>
          <div className="title">
            <input
              type="text"
              placeholder="Add title"
              className="form-body__add-item"
              value={title}
              onChange={(date: ChangeEvent<HTMLInputElement>) => {
                setTitle(date.target.value);
                setEvent({ ...event, title: date.target.value });
              }}
            />
            {getTitleError(title) && (
              <p className="errorMsg">{getTitleError(title)}</p>
            )}
          </div>
          <span className="form-body__icons"></span>
          <div className="form-body__btn-list">
            <button type="button" className="event-btn">
              Event
            </button>
            <button type="button" className="simple-btn">
              Focus time
              <span className="list-btn__new-item">NEW</span>
            </button>
            <button type="button" className="simple-btn">
              Out of office
            </button>
            <button type="button" className="simple-btn">
              Working location
              <span className="list-btn__new-item">NEW</span>
            </button>
            <button type="button" className="simple-btn">
              Task
            </button>
            <button type="button" className="simple-btn">
              Appointment schedule
            </button>
          </div>
          <span className="form-body__icons material-symbols-outlined">
            access_time
          </span>
          <div className="time-input">
            <input
              type="datetime-local"
              className="simple-btn start-time"
              onChange={(date: ChangeEvent<HTMLInputElement>) => {
                setStartDateInputValue(new Date(date.target.value));
                setEvent({
                  ...event,
                  startDate: new Date(date.target.value),
                });
              }}
              value={dateToString(startDateInputValue)}
            />
            <input
              type="datetime-local"
              className={`simple-btn end-time`}
              value={endDateInputValue}
              onChange={(date: ChangeEvent<HTMLInputElement>) => {
                setEndDateInputValue(date.target.value);
                setEvent({
                  ...event,
                  endDate: new Date(date.target.value),
                });
              }}
            />
            {getTimeError({
              endTime: new Date(endDateInputValue),
              startTime: new Date(startDateInputValue),
            }) && (
              <p className="errorMsg">
                {getTimeError({
                  endTime: new Date(endDateInputValue),
                  startTime: new Date(startDateInputValue),
                })}
              </p>
            )}
          </div>
          <span className="form-body__icons"></span>
          <div className="form-body__day-timezone">
            <input type="checkbox" id="all-day" />
            <label htmlFor="all-day">All day</label>
            <select
              name="timezone_offset"
              id="timezone-offset"
              className="simple-select--no-arrow"
            >
              <option className="timezone">Time zone</option>
            </select>
          </div>
          <span className="form-body__icons"></span>
          <select className="simple-select--no-arrow">
            <option value="no-repeat">Does not repeat</option>
            <option value="daily">Daily</option>
            <option value="on-tuesday">Weekly on Tuesday</option>
            <option value="on-third-tuesday">
              Monthly on the third Tuesday
            </option>
            <option value="annually">Annually on July 18</option>
            <option value="every-weekday">
              Every weekday (Monday to Friday)
            </option>
            <option value="custom">Custom...</option>
          </select>
          <span className="form-body__icons"></span>
          <div>
            <button type="button" className="simple-btn">
              Find a time
            </button>
          </div>
          <span className="material-symbols-outlined"> group </span>
          <input
            type="text"
            className="add-guests-location"
            placeholder="Add guests"
          />
          <span className="material-symbols-outlined"> meeting_room </span>
          <div>
            <select className="simple-select--blue">
              <option value="add">Add video conferencing</option>
              <option value="google-meet">Google Meet</option>
              <option value="zoom-meeting">Zoom Meeting</option>
            </select>
          </div>
          <span className="material-symbols-outlined"> videocam </span>
          <div>
            <button type="button" className="simple-btn">
              Add rooms
            </button>
          </div>
          <span className="material-symbols-outlined"> location_on </span>
          <input
            type="text"
            className="add-guests-location"
            placeholder="Add location"
          />
          <span className="form-body__icons material-symbols-outlined">
            notes
          </span>
          <div>
            <button type="button" className="simple-btn">
              Add <em className="add-desc--underline">description</em> or
              <em className="add-desc--underline">attachments</em>
            </button>
          </div>
          <span className="material-symbols-outlined"> event </span>
          <div>
            <button type="button" className="user-btn">
              <ul className="user-btn__username">
                <li>Emilija Rackauskaite</li>
                <li className="user-btn__username__circle"></li>
              </ul>
              <span className="user-btn__user-status">
                Busy • Default visibility • Notify 10 minutes before
              </span>
            </button>
          </div>
        </section>
        <section className="form-footer">
          <button type="button" className="more-options">
            More options
          </button>
          <button className="save">Save</button>
        </section>
      </form>
    </section>
  );
};

export default EventModal;
