import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from classifier import Classifier
from contextlib import asynccontextmanager


#Instantiating the class
classifier = Classifier()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    classifier.data_init()
    yield  # This allows the app to run
    # Shutdown logic
    print("Server shutdown logic executed.")

app = FastAPI(lifespan=lifespan)

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

@app.post("/classify")
async def do_calc(msg : Chat):

    # call calculation helper function
    probability = classifier.classify(msg.content)

    return {"message": "Message log probability calculated", "nta": probability[0], "yta": probability[1], "solo": classifier.word_personal_prob, "chat": msg.content}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)



# startup -> data_init 
# user submits -> post request to classify -> classify -> returns probability to user
#                                          -> append to a list (string, map(word to (yta, nta probability)))
#                                          -> send to javascript array (string, probability, individual probability)
# History
# Highlighting text
# Voice Feature 