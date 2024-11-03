import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UserManagement from "./components/userManagement";


const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-management" element={<UserManagement />} />
      </Routes>
    </div>
  );
};

export default App;
