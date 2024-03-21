import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register";
import Layout from "./Layout";
import MainMeeting from "./Pages/MainMeeting/MainMeeting";
import Lobby from "./Screens/Lobby";
import RoomPage from "./Screens/Room";
import { SocketProvider } from "./context/SocketProvider";
import ContextProvider from "./context/Context";

const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/meet" element={<MainMeeting />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </Layout>
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </SocketProvider>
  </React.StrictMode>
);
