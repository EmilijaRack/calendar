import React from "react";

const NavButtons = ({
  onPrevClick,
  onNextClick,
}: {
  onPrevClick: () => void;
  onNextClick: () => void;
}) => {
  return (
    <span className="btn-arrow-wrapper">
      <button
        className="btn-arrow material-symbols-outlined"
        id="top-left-navigation"
        onClick={onPrevClick}
      >
        chevron_left
      </button>
      <button
        className="btn-arrow material-symbols-outlined"
        id="top-right-navigation"
        onClick={onNextClick}
      >
        chevron_right
      </button>
    </span>
  );
};

export default NavButtons;
