import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar(){
  const navigate = useNavigate();
  const token = localStorage.getItem('skillmate_token');
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold">SM</div>
          <div>
            <div className="font-semibold text-lg">SkillMate</div>
            <div className="text-xs text-slate-500">Find teammates you can trust</div>
          </div>
        </div>
        <nav className="flex items-center gap-3">
          <Link to="/explore" className="px-3 py-2 hover:bg-slate-100 rounded">Explore</Link>
          <Link to="/teams" className="px-3 py-2 hover:bg-slate-100 rounded">Teams</Link>
          { token ? (
            <div className="flex gap-3 items-center">
              <button onClick={()=> navigate('/create-project')} className="px-3 py-2 bg-blue-600 text-white rounded">Create Project</button>
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer" onClick={()=> navigate('/profile')}>A</div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="px-3 py-2">Login</Link>
              <Link to="/signup" className="px-3 py-2 bg-blue-600 text-white rounded">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
