from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from enum import Enum
import logging

app = FastAPI()

log = logging.getLogger(__name__)

# Configure CORS to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://app.margot.ddev.site"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DataStoreType(str, Enum):
    neo4j = "neo4j"
    pineconde = "pinecone"
    postgres = "postgres"

class UserPrompt(BaseModel):
    prompt: str


@app.get("/")
def read_root():
    return {"message": "Hello World from FastAPI"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

@app.post("/api/transcribe")
def transcribe(prompt: UserPrompt, type: DataStoreType = DataStoreType.neo4j) -> str:
    log.info(f"got transcribe prompt {prompt}. Using db type {type.value}")
    return f"stored for type {type.value}"


@app.post("/api/ask")
def ask(prompt: UserPrompt, type: DataStoreType = DataStoreType.neo4j) -> str:
    log.info(f"got question prompt {prompt}. Using db type {type.value}")
    return f"answer for type {type.value}"

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
