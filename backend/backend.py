from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ollama_client import query_model
import logging

app = FastAPI()

logging.basicConfig(level=logging.INFO)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    model: str
    query: str

@app.post("/query")
def get_response(query: Query):
    logging.info(f"Received query: {query}")
    response = query_model(query.model, query.query)
    logging.info(f"Response: {response}")
    return {"response": response}