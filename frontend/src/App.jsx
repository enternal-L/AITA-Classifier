import { useState } from 'react'
import api from "./api.js"

import Content from './components/content.jsx'
import Nav from './components/nav.jsx'

function App() {
  const [chats, setChats] = useState([])
  const [color, setColor] = useState("#D9C2A4")

  const addChat = async (chat) => {
    try {
        const response = await api.post('/chats', {
          content: chat
        });
    }

    catch(error){
      console.log("Error Occured", error)
    }
  }

  const fetchChat = async () => {
    try {
        const response = await api.get('/chats');
        // send get request to /chats endpoint
        setChats(response.data.chats)
        // we're getting the class Chat where the member variable chats stores the chats
        console.log("Retrieved chat!")
    }

    catch(error){
      console.log("Error Occured", error)
    }
  }

  return (
    <div className='app flex flex-col'>
      <Nav color={color}></Nav>
      <Content onSubmit={addChat} fetchChat={fetchChat} color={color} setColor ={setColor}/>
      {/* we're passing in the function to be called in the component */}

      {/* <button onClick={() => {fetchChat()}}>Get Chats</button>  */}
      {/* we're directly calling the function */}
    </div>
  )
}

export default App
