import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded p-8 shadow">
        <h1 className="text-3xl font-bold">Find teammates you can trust — fast.</h1>
        <p className="mt-2 text-slate-600">Match based on real work, peer ratings, and availability.</p>
        <div className="mt-6 flex gap-3">
          <Link to="/explore" className="px-4 py-2 bg-blue-600 text-white rounded">Explore Profiles</Link>
          <Link to="/create-project" className="px-4 py-2 border rounded">Create Project</Link>
        </div>
      </div>
    </div>
  );
}
