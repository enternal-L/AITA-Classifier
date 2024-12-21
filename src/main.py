import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/da")
def read_root():
    return {"Woah": "Yes"}