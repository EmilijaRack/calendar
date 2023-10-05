import React from "react";

const EventDisplayViewButton = () => {
  return (
    <nav className="header__block">
      <button className="btn-date btn-date--right-8">
        <span className="btn-date__elem">
          <p className="btn-date__elem__text">Week</p>
          <span className="material-symbols-outlined"> arrow_drop_down </span>
        </span>
      </button>
    </nav>
  );
};

export default EventDisplayViewButton;
