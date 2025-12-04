import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';

export default function Teams(){
  const [teams, setTeams] = useState([]);
  useEffect(()=> {
    api.get('/teams').then(res => setTeams(res.data.teams || [])).catch(()=> {});
  }, []);
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Teams</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.map(t => (
          <div key={t._id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{t.projectId ? t.projectId.title : 'Project'}</div>
                <div className="text-sm text-slate-500">Status: {t.status}</div>
              </div>
              <div className="flex -space-x-2">{(t.members||[]).map(m=> <div key={m.userId} className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs">{String(m.userId).slice(-2)}</div>)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
