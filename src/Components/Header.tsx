import React from "react";
import SideMenu from "./SideMenu";
import NavArrows from "./NavButtons";
import EventDisplayViewButton from "./EventDisplayViewButton";

export type HeaderProps = {
  onNextClick: () => void;
  onPrevClick: () => void;
  displayDate: Date;
};

const Header = ({ onNextClick, onPrevClick, displayDate }: HeaderProps) => {
  return (
    <header className="header">
      <SideMenu />
      <nav
        className="header__block header__block--left"
        id="header-navigation-root"
      >
        <button className="btn-date btn-date--right-12">
          <p className="btn-date__text">Today</p>
        </button>
        <NavArrows onPrevClick={onPrevClick} onNextClick={onNextClick} />
        <div className="header__block__caption">
          <h1 className="header__block__caption__h1 date">
            {displayDate.toLocaleString("default", { month: "long" })}{" "}
            {displayDate.getFullYear()}
          </h1>
        </div>
      </nav>
      <EventDisplayViewButton />
    </header>
  );
};

export default Header;
