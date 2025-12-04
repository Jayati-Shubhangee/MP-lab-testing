import React, { useState } from 'react';
import api from '../api/apiClient';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState(''), [password, setPassword] = useState(''), [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/signup', { email, password, displayName });
      const { token } = res.data;
      localStorage.setItem('skillmate_token', token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={displayName} onChange={(e)=>setDisplayName(e.target.value)} placeholder="Display name" className="w-full p-3 border rounded" />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border rounded" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-3 border rounded" />
        <button className="w-full bg-blue-600 text-white p-3 rounded">Create account</button>
      </form>
    </div>
  );
}
