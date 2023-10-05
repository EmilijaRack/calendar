import React from "react";
import NavButtons from "./NavButtons";

const SideCalendarHeader = ({
  onPrevClick,
  onNextClick,
  displayDate,
}: {
  onPrevClick: () => void;
  onNextClick: () => void;
  displayDate: string;
}) => {
  return (
    <section className="calendar-header">
      <p className="current-date">{displayDate}</p>
      <NavButtons onPrevClick={onPrevClick} onNextClick={onNextClick} />
    </section>
  );
};

export default SideCalendarHeader;
