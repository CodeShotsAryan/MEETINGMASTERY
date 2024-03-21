import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";
import { useSpeechRecognition } from './myAi'; // Adjust the import path
import "./Room.css";

const MyComponent = () => {
  const { clickToConvert, clickToEnd, clickToDownload } = useSpeechRecognition();

  return (
    <div>
      <button  onClick={clickToConvert}>Start Conversion</button>
      <button onClick={clickToEnd}>Stop Conversion</button>
      <button onClick={clickToDownload}>Download Data</button>
    </div>
  );
};

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
<<<<<<< HEAD
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
=======
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState(); 
>>>>>>> 42260baaf3f03184e78574a957c7b2c5fd28cad0

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      const offer = await peer.getOffer();
      socket.emit("user:call", { to: remoteSocketId, offer });
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      try {
        setRemoteSocketId(from);
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setMyStream(stream);
        console.log(`Incoming Call`, from, offer);
        const ans = await peer.getAnswer(offer);
        socket.emit("call:accepted", { to: from, ans });
      } catch (error) {
        console.error("Error accepting incoming call:", error);
      }
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    if (myStream) {
      for (const track of myStream.getTracks()) {
        peer.peer.addTrack(track, myStream);
      }
    }
  }, [myStream]);

<<<<<<< HEAD
=======
  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handlecall_and_convert = () => {
    clickToConvert(); 
  };

>>>>>>> 42260baaf3f03184e78574a957c7b2c5fd28cad0
  const handleNegoNeeded = useCallback(async () => {
    try {
      const offer = await peer.getOffer();
      socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
    } catch (error) {
      console.error("Error handling negotiation needed:", error);
    }
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      try {
        const ans = await peer.getAnswer(offer);
        socket.emit("peer:nego:done", { to: from, ans });
      } catch (error) {
        console.error("Error handling negotiation needed (incoming):", error);
      }
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    try {
      await peer.setLocalDescription(ans);
    } catch (error) {
      console.error("Error handling final negotiation:", error);
    }
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", (ev) => {
      console.log("GOT TRACKS!!");
      setRemoteStream(ev.streams[0]);
    });
    return () => {
      peer.peer.removeEventListener("track", (ev) => {
        console.log("Track event listener removed");
      });
    };
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  const handleCallAccepted = ({ ans }) => {
    try {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    } catch (error) {
      console.error("Error accepting call:", error);
    }
  };

  return (
    <div>
<<<<<<< HEAD
      <h1>Room Page
=======
      <h1>Room Page</h1>
      <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
      {myStream && <button onClick={sendStreams}>Send Stream</button>}
      {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
      {myStream && (
        <>
          <h1>My Stream</h1>
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={myStream}
          />
        </>
      )}
      {remoteStream && (
        <>
          <h1>Remote Stream</h1>
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={remoteStream}
          />
        </>
      )}
      <MyComponent />
    </div>
  );
};

export default RoomPage;
>>>>>>> 42260baaf3f03184e78574a957c7b2c5fd28cad0
