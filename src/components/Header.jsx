
import React from "react";
import { useState } from "react";

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div className="header-home">
      <div className="text">DASHBØARD</div>
      <div
        className="user-info"
        onMouseEnter={() => setDropdownVisible(true)}
        onMouseLeave={() => setDropdownVisible(false)}
      >
        <span
          className="user-name"
          onClick={() => setDropdownVisible((prev) => !prev)}
        >
          Profile
        </span>
        {isDropdownVisible && (
          <div className="dropdown-menu">
            <div
              className="dropdown-item"
              onClick={() =>
                alert("Settings functionality not implemented yet.")
              }
            >
              <i className="bx bx-cog"></i>Settings
            </div>
            <div
              className="dropdown-item"
              onClick={() => alert("Logout functionality not implemented yet.")}
            >
              <i className="bx bx-log-out"></i> Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
