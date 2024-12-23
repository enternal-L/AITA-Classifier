import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import api from "./api.js"

import Content from './components/content.jsx'
import History from './components/History.jsx'

function App() {
  const [fruits, setFruits] = useState([])
  const [chats, setChats] = useState([])

  const addChat = async (chat) => {
    try {
        const response = await api.post('/chats', {
          content: chat
        });

        console.log(response.data)
    }

    catch(error){
      console.log("Error Occured", error)
    }
  }

  const fetchChat = async () => {
    try {
        const response = await api.get('/chats');
        setChats(response.data)
        console.log("get chat correctly")
    }

    catch(error){
      console.log("Error Occured", error)
    }
  }

  const fetchFruits = async () => {
    try {
        const response = await api.get('/fruits');
        setFruits(response.data);

        console.log(response)

    }
    catch (error){
      console.log("Error Occured", error)
    }
  }


  return (
    <>
      <Content onSubmit={addChat}/>
      <button onClick={() => {fetchChat}}>Get Chats</button>
      <History chats={chats}/>
      <button onClick={() => {fetchFruits}}>
          Click me!
      </button>
      <div>
        {
          fruits && fruits.map((item, index) => (
            <p key = {index}>{item}</p>
          ))
        }
      </div>
    </>
  )
}

export default App
