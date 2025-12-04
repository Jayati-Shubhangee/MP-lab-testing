import React, { useState } from 'react';
import api from '../api/apiClient';
import { useNavigate } from 'react-router-dom';

export default function CreateProject() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [roles, setRoles] = useState('Frontend,Backend,Designer');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      title, description: desc, roles: roles.split(',').map(r=>({ roleName: r.trim(), minCount:1 }))
    };
    try {
      const res = await api.post('/projects', payload);
      alert('Project created');
      navigate(`/`);
    } catch (err) {
      alert('error creating project');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Project</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Project title" className="w-full p-3 border rounded" />
        <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Short description" className="w-full p-3 border rounded" />
        <input value={roles} onChange={(e)=>setRoles(e.target.value)} placeholder="Roles (comma separated)" className="w-full p-3 border rounded" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Create & Suggest</button>
      </form>
    </div>
  );
}
