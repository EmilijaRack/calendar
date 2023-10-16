import React from "react";
import SimpleBtn from "./EventModalSimpleBtn";

const EventModalBtnList = () => {
  return (
    <div className="form-body__btn-list">
      <button type="button" className="event-btn">
        Event
      </button>
      <button type="button" className="simple-btn">
        Focus time
        <span className="list-btn__new-item">NEW</span>
      </button>
      <SimpleBtn value="Out of office" />
      <button type="button" className="simple-btn">
        Working location
        <span className="list-btn__new-item">NEW</span>
      </button>
      <SimpleBtn value="Task" />
      <SimpleBtn value="Appointment schedule" />
    </div>
  );
};

export default EventModalBtnList;
