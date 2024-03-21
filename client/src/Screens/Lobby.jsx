<<<<<<< HEAD
import React from 'react'
=======
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import './Lobby.css'

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);
>>>>>>> d2be03bb3547c91e5e1b2a471ad47ff18cbe91a6

const Lobby = () => {
  return (
<<<<<<< HEAD
    <div>
     
=======
    <div className="containers">
      <form onSubmit={handleSubmitForm} className="form-container">
      <h1>Join Meeting</h1>
      <div>

        <label htmlFor="email">Email ID </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
        <br />
        <div>

        <label htmlFor="room">Room Number</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        </div>
        <br />
        <button>Join</button>
      </form>
>>>>>>> d2be03bb3547c91e5e1b2a471ad47ff18cbe91a6
    </div>
  )
}

export default Lobby
