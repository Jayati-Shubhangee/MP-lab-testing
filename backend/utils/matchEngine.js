function ruleBasedScore(user, project) {
  const reqRoles = (project.roles || []).map(r => r.roleName.toLowerCase());
  const userSkills = (user.skills || []).map(s => s.name.toLowerCase());
  let matched = 0;
  let totalSkillLevel = 0;
  reqRoles.forEach(role => {
    const idx = userSkills.indexOf(role);
    if (idx !== -1) {
      matched++;
      const skillObj = user.skills.find(s => s.name.toLowerCase() === role);
      totalSkillLevel += (skillObj?.level || 3);
    }
  });
  const skillMatch = reqRoles.length ? (matched / reqRoles.length) : 0;
  const skillLevelFactor = reqRoles.length ? (totalSkillLevel / (reqRoles.length * 5)) : 0;
  const skillScore = skillMatch * 0.9 + skillLevelFactor * 0.1;

  const evidence = user.githubVerified ? 1 : 0;
  const avg = user.avgRating || (user.testimonials && user.testimonials.length ? user.testimonials.reduce((a,b)=>a+b.rating,0)/user.testimonials.length : 0);
  const peerScore = avg ? (avg/5) : 0.5;
  const availability = project.preferredTime && project.preferredTime.length ? (project.preferredTime.some(t => (user.availability || []).includes(t)) ? 1 : 0) : 1;
  const final = (0.5*skillScore + 0.25*peerScore + 0.15*evidence + 0.10*availability) * 100;
  return {
    finalScore: Math.round(final),
    breakdown: {
      skill: Math.round(skillScore * 100),
      peer: Math.round(peerScore * 100),
      evidence: Math.round(evidence * 100),
      availability: Math.round(availability * 100)
    }
  };
}

async function getMLRanking(projectId, candidateIds, mlUrl) {
  // call ML service if available
  try {
    const res = await fetch(mlUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ projectId, candidateIds })
    });
    if (!res.ok) throw new Error('ML service error');
    const data = await res.json();
    return data; // expect { suggestions: [ { candidateId, score, breakdown } ] }
  } catch (err) {
    console.warn('ML service not available, fallback to rule-based', err.message);
    return null;
  }
}

module.exports = {
  ruleBasedScore,
  getMLRanking
};
