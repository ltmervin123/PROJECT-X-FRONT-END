import React from "react";
import { useState } from "react";


const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <div className="logo-details">
        <div className="avatar">AVATAR</div>
        <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
      </div>
      <ul className="nav-list">
        <li className="active">
          <a href="/home" id="mockInterviewBtn">
            <i className="bx bx-home"></i>
            <span className="links_name">Mock Interview</span>
          </a>
          <span className="tooltip">Mock Interview</span>
        </li>
        <li>
          <a href="#!" id="uploadResume" onClick={() => alert('No function yet')}>
            <i className="bx bx-upload"></i>
            <span className="links_name">Upload Resume</span>
          </a>
          <span className="tooltip">Upload Resume</span>
        </li>
        <li>
          <a href="/home">
            <i className="bx bx-clipboard"></i>
            <span className="links_name">Result</span>
          </a>
          <span className="tooltip">Result</span>
        </li>
        <li className="profile">
          <div
            className="Logout"
            onClick={() => alert("Logout functionality not implemented yet.")}
          >
            LOGOUT
          </div>
          <i className="bx bx-log-out" id="log_out"></i>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
