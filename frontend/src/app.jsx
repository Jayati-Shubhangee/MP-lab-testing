import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import CreateProject from './pages/CreateProject';
import Teams from './pages/Teams';

export default function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/teams" element={<Teams />} />
        </Routes>
      </div>
    </div>
  );
}
