import React from "react";
import { ChangeEvent, useState } from "react";

const EventModal = () => {
  const dateToString = (date: Date): string => {
    return date.toLocaleString("lt-LT", {
      timeStyle: "short",
      dateStyle: "medium",
    });
  };

  const [dateInputValue, setDateInputValue] = useState(
    dateToString(new Date())
  );

  const handleChange = (date: ChangeEvent<HTMLInputElement>) => {
    setDateInputValue(date.target.value);
  };

  return (
    <section className="event-modal" id="event-modal">
      <form className="event-form" onSubmit={() => false}>
        <section className="form-header">
          <button className="material-symbols-outlined close-btn">close</button>
        </section>
        <section className="form-body">
          <span className="form-body__icons"></span>
          <div className="title">
            <input
              type="text"
              placeholder="Add title"
              className="form-body__add-item"
            />
          </div>
          <span className="form-body__icons"></span>
          <div className="form-body__btn-list">
            <button className="event-btn">Event</button>
            <button className="simple-btn">
              Focus time
              <span className="list-btn__new-item">NEW</span>
            </button>
            <button className="simple-btn">Out of office</button>
            <button className="simple-btn">
              Working location
              <span className="list-btn__new-item">NEW</span>
            </button>
            <button className="simple-btn">Task</button>
            <button className="simple-btn">Appointment schedule</button>
          </div>
          <span className="form-body__icons material-symbols-outlined">
            access_time
          </span>
          <div className="time-input">
            <input
              type="datetime-local"
              className="simple-btn start-time"
              onChange={handleChange}
              value={dateInputValue}
            />
            <input
              type="datetime-local"
              className={`simple-btn end-time`}
              onChange={handleChange}
            />
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
            <button className="simple-btn">Find a time</button>
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
            <button className="simple-btn">Add rooms</button>
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
            <button className="simple-btn">
              Add <em className="add-desc--underline">description</em> or
              <em className="add-desc--underline">attachments</em>
            </button>
          </div>
          <span className="material-symbols-outlined"> event </span>
          <div>
            <button className="user-btn">
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
          <button className="more-options">More options</button>
          <button className="save">Save</button>
        </section>
      </form>
    </section>
  );
};

export default EventModal;
