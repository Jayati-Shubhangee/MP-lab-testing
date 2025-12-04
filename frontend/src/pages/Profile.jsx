import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';

export default function Profile() {
  const [user, setUser] = useState(null);
  useEffect(()=> {
    api.get('/users/me').then(res => setUser(res.data.user)).catch(()=> {});
  }, []);
  if (!user) return <div className="max-w-4xl mx-auto">Login to view profile</div>;
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center font-bold">{user.displayName?.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
        <div>
          <h2 className="text-2xl font-semibold">{user.displayName}</h2>
          <div className="text-sm text-slate-500">{user.college} • {user.year}</div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold">Skills</h3>
        <div className="flex gap-2 mt-2">{(user.skills||[]).map(s=> <div key={s.name} className="px-2 py-1 bg-slate-100 rounded">{s.name} ({s.level})</div>)}</div>
      </div>
    </div>
  );
}
