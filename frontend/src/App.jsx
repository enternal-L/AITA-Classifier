import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import api from "./api.js"

import Content from './components/content.jsx'
import History from './components/History.jsx'
import Nav from './components/Nav.jsx'

function App() {
  const [fruits, setFruits] = useState([])
  const [chats, setChats] = useState([])

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
    <>
      <Nav></Nav>
      <Content onSubmit={addChat}/>
      {/* we're passing in the function to be called in the component */}

      <button onClick={() => {fetchChat()}}>Get Chats</button> 
      {/* we're directly calling the function */}
    
      <History chats={chats}/>
      {/* displays chat history after retrieving it */}

      <div className="bg-blue-500 text-white p-4">
        Hello, Tailwind!
      </div>
    </>
  )
}

export default App
