import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link } from "react-router-dom";
import hero from "../../assets/hero.png";
import logo from "../../assets/meetinglogo.png";
import "./Home.css";
const Home = () => {
  return (
    <div>
      <nav className="navbar navbar-dark ">
        <div className="logo">
          <img src={logo} />
        </div>
        <div className="loginbtns">
          <Link to="/register">
            <button>Sign up</button>
          </Link>
          <Link to="/login">
            <button>Sign in</button>
          </Link>
        </div>
      </nav>

      <div className="main-page">
        <div className="left">
          <p>
            "Unlocking Productivity, One Meeting at a Time: Your AI Meeting
            Companion"
          </p>
          <div className="btn-container">
            <Link to="/lobby">
              <button>New Meeting</button>
            </Link>
            <button>Join Meeting</button>
          </div>
        </div>
        <div className="right">
          <img
            src={hero}
            className="hero-image rounded-md select-none"
            draggable="false"
            alt="Hero Image"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
