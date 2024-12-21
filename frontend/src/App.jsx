import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import api from "./api.js"

function App() {
  const [count, setCount] = useState(0)
  const [fruits, setFruits] = useState([])

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
      <button onClick={fetchFruits}>
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
