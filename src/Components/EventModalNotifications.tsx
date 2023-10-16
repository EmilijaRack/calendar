import React from "react";

const EventModalNotifications = () => {
  return (
    <select className="simple-select--no-arrow">
      <option value="no-repeat">Does not repeat</option>
      <option value="daily">Daily</option>
      <option value="on-tuesday">Weekly on Tuesday</option>
      <option value="on-third-tuesday">Monthly on the third Tuesday</option>
      <option value="annually">Annually on July 18</option>
      <option value="every-weekday">Every weekday (Monday to Friday)</option>
      <option value="custom">Custom...</option>
    </select>
  );
};
export default EventModalNotifications;
