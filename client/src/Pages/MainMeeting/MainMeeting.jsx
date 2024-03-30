import React, { useEffect, useState, useContext } from "react";
import "./Mainmeeting.css";
import Chat from "./Chat";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const MainMeeting = () => {
  const members = [
    {
      user_name: "Avishkar Kakade",
      user_email: "kakadeavishkar84@gmail.com",
      user_id: "1dskjn22",
      isAdmin: true,
    },
    {
      user_name: "Aryan Patil",
      user_email: "aryancse1@gmail.com",
      user_id: "2nfjsk",
      isAdmin: false,
    },
    {
      user_name: "Ayush Sonawane",
      user_email: "ayushsonawane264@gmail.com",
      user_id: "skjgn33",
      isAdmin: false,
    },
    {
      user_name: "Tejas Babar",
      user_email: "tejasbabar@gmail.com",
      user_id: "fskkb392",
      isAdmin: false,
    },
    {
      user_name: "Kartik Sawant",
      user_email: "kartiksawnat@gmail.com",
      user_id: "slldfn8282",
      isAdmin: false,
    },
    {
      user_name: "Falashree Shirodkar",
      user_email: "fal@gmail.com",
      user_id: "skkj242",
      isAdmin: false,
    },
    {
      user_name: "Anshika Arekar",
      user_email: "ansh@gmail.com",
      user_id: "skdjf332",
      isAdmin: false,
    },

    {
      user_name: "someone",
      user_email: "some@gmail.com",
      user_id: "aksn",
      isAdmin: false,
    },
    {
      user_name: "someone",
      user_email: "some@gmail.com",
      user_id: "aksn",
      isAdmin: false,
    },
    {
      user_name: "someone",
      user_email: "some@gmail.com",
      user_id: "aksn",
      isAdmin: false,
    },
    {
      user_name: "someone",
      user_email: "some@gmail.com",
      user_id: "aksn",
      isAdmin: false,
    },
    {
      user_name: "someone",
      user_email: "some@gmail.com",
      user_id: "aksn",
      isAdmin: false,
    },
  ];
  const {
    onSent,
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
  } = useContext(Context);
  const [meetingMembers, setMeetingMembers] = useState(members);
  const [isShowAll, setIsShowAll] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isChatBot, setIsChatBot] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.addEventListener("resize", handleResize);
  }, []);

  const handleShowAllClickTrue = () => {
    setIsShowAll(true);
  };
  const handleShowAllClickFalse = () => {
    setIsShowAll(false);
  };

  return (
    <div className="container">
      {isMobileView ? (
        <>
          <div className="mains">
            {isShowAll ? (
              <>
                <button className="backbtn" onClick={handleShowAllClickFalse}>
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <div className="grid-container">
                  {/* <p>All Members</p> */}
                  {members.map((currentMember) => {
                    return (
                      <div key={currentMember.user_id} className="grid-item">
                        <p>{currentMember.user_name}</p>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
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
                    <p>
                      <i className="fa-solid fa-microphone-slash"></i>
                    </p>
                    <p>
                      <i className="fa-solid fa-video"></i>
                    </p>
                    <p onClick={() => setIsChatBot(!isChatBot)}>
                    {isChatBot ? <i className="fa-solid fa-user-group"></i> : <i className="fa-solid fa-comment"></i>}
                    </p>
                    <p>
                      {/* caption generation button */}
                      <button>
                        <i class="fa-solid fa-closed-captioning"></i>
                      </button>
                    </p>
                    <p>
                      <i className="fa-solid fa-bars"></i>
                    </p>
                  </div>
                </div>

                {/* caption will be displayed here */}
                <p className="caption">healkfndslfnclsinflsi</p>

                <div className={isMobileView && isChatBot ? "secondary-videos mobile-view" : "secondary-videos"}>
                  {isChatBot ? (
                    <>
                      <div className="resp-main ">
                        <div className="resp-main-container">
                          {!showResult ? (
                            <>
                              <p></p>
                            </>
                          ) : (
                            <div className="resp-result">
                              {/* <div className="resp-result-title">
                                <img src={assets.user_icon} />
                                <p>{recentPrompt}</p>
                              </div> */}
                              <div className="resp-result-data">
                                {/* <img src={assets.gemini_icon} /> */}
                                {loading ? (
                                  <div className="resp-loader">
                                  <p>loading</p>
                                    <hr />
                                    <hr />
                                    <hr />
                                  </div>
                                ) : (
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: resultData,
                                    }}
                                  ></p>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="resp-main-bottom">
                            <div className="resp-search-box">
                              <input
                                onChange={(e) => setInput(e.target.value)}
                                value={input}
                                type="text"
                                placeholder="Enter a prompt here"
                              />
                              <div>
                                <img
                                  onClick={() => onSent()}
                                  src={assets.send_icon}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      {meetingMembers.slice(0, 4).map((currentMembers) => {
                        return (
                          <div key={currentMembers.user_id}>
                            <p>{currentMembers.user_name}</p>
                          </div>
                        );
                      })}
                      <button
                        className="showallbtn"
                        onClick={handleShowAllClickTrue}
                      >
                        Show All
                      </button>
                      {console.log(isShowAll)}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="mains">
            {isShowAll ? (
              <>
                <button className="backbtn" onClick={handleShowAllClickFalse}>
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
                <div className="grid-container">
                  {/* <p>All Members</p> */}
                  {members.map((currentMember) => {
                    return (
                      <div key={currentMember.user_id} className="grid-item">
                        <p>{currentMember.user_name}</p>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
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
                    <p>
                      <i className="fa-solid fa-microphone-slash"></i>
                    </p>
                    <p>
                      <i className="fa-solid fa-video"></i>
                    </p>
                    <p>
                      <i className="fa-solid fa-hand"></i>
                    </p>
                    <p>
                      {/* caption generation button */}
                      <button>
                        <i class="fa-solid fa-closed-captioning"></i>
                      </button>
                    </p>
                    <p>
                      <i className="fa-solid fa-bars"></i>
                    </p>
                  </div>
                </div>

                {/* caption will be displayed here */}
                <p className="caption">healkfndslfnclsinflsi</p>

                <div className="secondary-videos">
                  {meetingMembers.slice(0, 4).map((currentMembers) => {
                    return (
                      <div key={currentMembers.user_id}>
                        <p>{currentMembers.user_name}</p>
                      </div>
                    );
                  })}
                  <button
                    className="showallbtn"
                    onClick={handleShowAllClickTrue}
                  >
                    Show All
                  </button>
                  {console.log(isShowAll)}
                </div>
              </>
            )}
          </div>
          <Chat />
        </>
      )}
    </div>
  );
};

export default MainMeeting;
