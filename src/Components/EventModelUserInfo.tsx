import React from "react";

const UserInfo = () => {
  return (
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
  );
};

export default UserInfo;
