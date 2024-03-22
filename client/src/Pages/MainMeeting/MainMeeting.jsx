import React from "react";
import "./Mainmeeting.css";
import Chat from "./Chat";
import { assets } from "../../assets/assets";
const MainMeeting = () => {

  

  return (
    <div className="container">
      <div className="mains">
        <div className="video-navbar">
          <div className="profile">
            <div className="profile-pic">
              <img src={assets.user_icon} />
            </div>
            <div className="profile-text">
              <h2>User Name Here</h2>
              <p>@userid</p>
            </div>
          </div>
          <div className="addbutton">
            <button>Add Members</button>
          </div>
        </div>
        <div className="main-video">
          <div className="video-handle">
            <p><i class="fa-solid fa-microphone-slash"></i></p>
            <p><i class="fa-solid fa-video"></i></p>
            <p><i class="fa-solid fa-hand"></i></p>
            <p><i class="fa-solid fa-bars"></i></p>
          </div>
        </div>
        <div className="secondary-videos">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <Chat />
    </div>
  );
};

export default MainMeeting;
