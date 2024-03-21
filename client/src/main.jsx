import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register";
import Layout from "./Layout";
import MainMeeting from "./Pages/MainMeeting/MainMeeting";
import Lobby from "./Screens/Lobby";
import ContextProvider from "./context/Context";
import { SocketProvider } from "./context/SocketProvider";
import RoomPage from "./Screens/Room";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path="/meet" element={<MainMeeting />} />
      <Route path="/lobby" element={<Lobby />} />
      <Route path="/room/:roomId" element={<RoomPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketProvider>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </SocketProvider>
  </React.StrictMode>
);
