import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import MockInterviewParent from "../components/MockInterviewParent";
import "../style/Home.css";

const Home = () => {
  return (
    <div>
      <Sidebar />
      <section className="home-section">
        <Header />
        <div className="card" id="mockInterviewOptions">
          <h2>Please Choose Interview Option</h2>
          <MockInterviewParent />
        </div>
      </section>
    </div>
  );
};

export default Home;
