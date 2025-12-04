import React from 'react';

export default function ProfileCard({ user, onInvite }) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-xl font-bold">{user.displayName?.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <div className="font-semibold">{user.displayName}</div>
              <div className="text-sm text-slate-500">{user.year} • {user.college}</div>
            </div>
            <div className="text-sm text-yellow-500">⭐ {user.avgRating || '—'}</div>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(user.skills || []).slice(0,3).map(s => <div key={s.name} className="text-xs px-2 py-1 bg-slate-100 rounded">{s.name}</div>)}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button className="px-3 py-1 border rounded">View Profile</button>
            <button onClick={() => onInvite && onInvite(user)} className="px-3 py-1 bg-blue-600 text-white rounded">Invite</button>
          </div>
        </div>
      </div>
    </div>
  );
}
