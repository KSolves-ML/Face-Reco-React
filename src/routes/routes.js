import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../FaceReco/App.js';
import Dashboard from '../Dashboard/Dashboard';

export default function RouteComponent() {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route path="/face-recognition" element={<App />} />
    </Routes>
  );
}
