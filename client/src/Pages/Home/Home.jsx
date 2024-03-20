import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
const Home = () => {
  return (
    <div>
      <nav className="navbar navbar-dark ">
          <div className="logo">logo</div>
          <div className="loginbtns">
            <button>Sign up</button>
            <button>Sign in</button>
          </div>
      </nav>
      
      <div className="main-page">
        <div className="left">
          <p>LESS MEETINGS<br/>MORE WORK DONE</p>
          <button>New Meeting</button>
        </div>
        <div className="right">
          images
        </div>
      </div>
    </div>
  );
};

export default Home;
