import React from "react";

const SideMenu = () => {
  return (
    <nav className="header__block header__block--margin">
      <span className="header__block__hamburger-menu">
        <svg focusable="false" viewBox="0 0 24 24" className="hamburger-menu">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
        </svg>
      </span>
      <span className="header__block__caption">
        <h1 className="header__block__caption__h1">Calendar</h1>
      </span>
    </nav>
  );
};

export default SideMenu;
