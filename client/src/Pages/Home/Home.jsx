import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import hero from "../../assets/hero.png";
import logo from "../../assets/meetinglogo.png";

const Home = () => {
  return (
    <div>
      <nav className="navbar navbar-dark ">
        <div className="logo">
          <img src={logo} />
        </div>
        <div className="loginbtns">
          <button>Sign up</button>
          <button>Sign in</button>
        </div>
      </nav>

      <div className="main-page">
        <div className="left">
          <p>
            "Unlocking Productivity, One Meeting at a Time: Your AI Meeting
            Companion"
          </p>
          <div className="btn-container">
            <button>New Meeting</button>
            <button>Join Meeting</button>
          </div>
        </div>
        <div className="right">
          <img src={hero} className="hero-image rounded-md select-none" 
          draggable="false"
          alt="Hero Image"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
