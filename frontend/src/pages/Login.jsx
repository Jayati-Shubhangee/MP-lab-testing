import React, { useState } from 'react';
import api from '../api/apiClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState(''), [password, setPassword] = useState('');
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token } = res.data;
      localStorage.setItem('skillmate_token', token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border rounded" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-3 border rounded" />
        <button className="w-full bg-blue-600 text-white p-3 rounded">Login</button>
      </form>
    </div>
  );
}
