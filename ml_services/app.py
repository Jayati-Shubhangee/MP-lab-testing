from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
import random

app = FastAPI()

class InferRequest(BaseModel):
    projectId: str
    candidateIds: List[str]

class SuggestItem(BaseModel):
    candidateId: str
    score: float
    breakdown: Dict[str, float]

@app.post("/infer")
async def infer(req: InferRequest):
    # Placeholder ML: return random scores for now
    suggestions = []
    for cid in req.candidateIds:
        skill = random.uniform(0.4,0.9)
        evidence = random.uniform(0.0,1.0)
        peer = random.uniform(0.3,1.0)
        availability = random.choice([0,1])
        final = 0.5*skill + 0.25*peer + 0.15*evidence + 0.10*availability
        suggestions.append({
            "candidateId": cid,
            "score": round(final*100, 2),
            "breakdown": {
                "skill": round(skill*100,2),
                "peer": round(peer*100,2),
                "evidence": round(evidence*100,2),
                "availability": availability*100
            }
        })
    suggestions.sort(key=lambda x: x['score'], reverse=True)
    return {"suggestions": suggestions}
