import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';
import ProfileCard from '../components/ProfileCard';

export default function Explore() {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState('');
  useEffect(()=> {
    api.get('/users').then(res => setUsers(res.data.users || []));
  }, []);
  const filtered = users.filter(u => !q || u.displayName.toLowerCase().includes(q.toLowerCase()) || (u.skills||[]).some(s => s.name.toLowerCase().includes(q.toLowerCase())));
  const handleInvite = (user) => {
    alert(`Invite ${user.displayName} - implement invite flow later`);
  };
  return (
    <div>
      <div className="mb-4">
        <input value={q} onChange={(e)=>setQ(e.target.value)} className="w-full md:w-1/2 p-3 border rounded" placeholder="Search by name or skill..." />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(u => <ProfileCard key={u._id} user={u} onInvite={handleInvite} />)}
      </div>
    </div>
  );
}
