import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

origins = [
    "http://localhost:5173"
] #allows CORS between frontend at port 5173 with backend

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"]
) #Cross Origin Resource Sharing: Defaultly blocks post/get from untrusted domains

class Chat(BaseModel):
    content: str

class Chats(BaseModel):
    chats: List[Chat]
    
memory_db = {"chats":[]}

# sample backend app
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/fruits")
def get_fruits():
    return ["apple", "bannana", "pear"]

@app.get("/chats", response_model=Chats)
def get_chats():
    return Chats(chats=memory_db["chats"])

@app.post("/chats")
def add_chat(msg : Chat):
    memory_db["chats"].append(msg)
    return {"message": "Message added correctly"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)