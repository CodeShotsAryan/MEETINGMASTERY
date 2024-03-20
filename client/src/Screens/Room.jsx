import React, { useEffect, useState } from "react";
import { useSocket } from "../Context/socketProvider";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setMyStream(stream);
      } catch (error) {
        console.error("Error getting user media:", error);
      }
    };

    getUserMedia();

    return () => {
      if (myStream) {
        myStream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <div>
      <h1>Room Page</h1>
      <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
      {myStream && (
        <>
          <h2>My Stream</h2>
          <video
            autoPlay
            muted
            height="100px"
            width="200px"
            srcObject={myStream}
          />
        </>
      )}
    </div>
  );
};

export default RoomPage;
