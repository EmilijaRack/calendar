import React from "react";

const EventModalVideoOptions = () => {
  return (
    <div>
      <select className="simple-select--blue">
        <option value="add">Add video conferencing</option>
        <option value="google-meet">Google Meet</option>
        <option value="zoom-meeting">Zoom Meeting</option>
      </select>
    </div>
  );
};

export default EventModalVideoOptions;
