import React, { useContext } from "react";
import "./Chat.css";
// import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { assets } from "../../assets/assets";
const Chat = () => {
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

  return (
    <div className="main ">
      <div className="nav">
        <p >ChatBot</p>
        <img src={assets.user_icon} />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            {/* <div className="greet"> */}
              <p>
                <span>Hello, Dev.</span>
              </p>
              {/* <p>How can i help you today?</p>
            </div> */}
            
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} />
              {loading ? (
                <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
              <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            //   className=""
            />
            <div>
              <img onClick={() => onSent()} src={assets.send_icon} />
            </div>
          </div>
          <p className="bottom-info">
            Here you can search for anything..
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
