import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Private from './components/Private';
import Navbar from './components/Navbar';

const AppRoutes = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/private" element={<Private />} />
      <Route path="*" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
