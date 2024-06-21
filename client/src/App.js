import React from "react";
import "./App.css";
import Signup from "./Compoments/Signup/Signup";
import Login from "./Compoments/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Compoments/Dashboard/Dashboard";
import EditProfile from "./Compoments/EditProfile/EditProfile";
import Tasks from "./Compoments/Tasks/Tasks";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/editprofile" element={<EditProfile />}></Route>
          <Route path="/tasks" element={<Tasks />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
