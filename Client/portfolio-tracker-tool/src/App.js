import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Settings from './pages/Settings'

import './App.css';

export default function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signin" element={!user ? <SignIn /> : <Navigate to="/" />} />
        <Route exact path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
        <Route exact path="/" element={user ? <Home /> : <Navigate to="/signin" />} />
        <Route exact path="/settings" element={user ? <Settings /> : <Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
}