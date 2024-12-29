import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
# from auxiliary import num_posts_with_label, words_count, labeled_words_count, total_num_posts, unique_words, nta_unique_words, yta_unique_words, remove_punctuation
from auxiliary import data_init
from classifier import classify

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
@app.on_event("startup")
async def start_up():
    data_init()


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
def do_calc(msg: str):
    # call calculation helper function
    probability = classify(msg)
    return {"message": "Message log probability calculated", "data": probability}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)



# startup -> data_init 
# user submits -> post request to classify -> classify -> returns probability to user
#                                          -> append to a list (string, map(word to (yta, nta probability)))
#                                          -> send to javascript array (string, probability, individual probability)
# History
# Highlighting text
# Voice Feature 