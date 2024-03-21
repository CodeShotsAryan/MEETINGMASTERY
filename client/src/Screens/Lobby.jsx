import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import "./Lobby.css";

const Lobby = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!email.trim() || !room.trim()) {
        setError("Please fill in both email and room fields.");
        return;
      }
      socket.emit("room:join", { email, room }, (error) => {
        if (error) {
          setError(error);
        }
      });
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
    if (socket) {
      socket.on("room:join", handleJoinRoom);
      return () => {
        socket.off("room:join", handleJoinRoom);
      };
    }
  }, [socket, handleJoinRoom]);

  return (
    <div className="lobby-container">
      <form onSubmit={handleSubmitForm} className="lobby-form">
        <h1>Join Meeting</h1>
        {error && <div className="error">{error}</div>}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="room">Room Number:</label>
          <input
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export default Lobby;
