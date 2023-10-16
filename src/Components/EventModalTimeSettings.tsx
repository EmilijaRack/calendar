import React from "react";

const EventModalTimeSettings = () => {
  return (
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
  );
};

export default EventModalTimeSettings;
