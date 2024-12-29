import React from 'react'
import { useState } from 'react'
import arrow from '../assets/arrow.svg'
import History from './History'
import api from "../api.js"

const Content = ({ onSubmit, fetchChat, color, setColor }) => {
    const [message, setMessage] = useState("")
    const [percent, setPercent] = useState([])
    // message is what we're typing in

    const handleKeyDown = (event) => {
        if(event.key === "Enter" && message !== ""){
            event.preventDefault();
            sendData(message)
        }
    }

    const sendData = async (message) => {
        try{
            const response = await api.post("/classify", {
              content: message
            });

            const yta = response.data.data.yta * 100
            const nta = response.data.data.nta * 100
            
            setPercent([yta.toFixed(2), nta.toFixed(2)])
            
            yta > nta ? console.log("Is the asshole") : console.log("Not the asshole")
            nta > yta ? setColor("#83D1AA") : setColor("#FFB2B2")
        }
    
        catch(error){
          console.log("Error Occured", error)
        }
      }

    return (
        <div className="flex-center bg-white h-[93%] flex-col">
            <div className="text-center space-y-6 flex flex-col m-4">
                <p className="text-5xl font-semibold text-gray-700 font-sans">Are you the AH?</p>
                <div className="w-96 min-h-24 flex flex-col flex-grow rounded-md" style={{ backgroundColor: color }}>
                    <textarea
                        className="w-full h-3/5 px-3 p-2 rounded-md placeholder-[#3F3E3E] outline-none resize-none overflow-hidden"
                        style={{ backgroundColor: color }}
                        placeholder="start yapping here..."
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            e.target.style.height = 'auto'; // Reset height to calculate scrollHeight
                            e.target.style.height = `${e.target.scrollHeight}px`; // Adjust to text content
                        }}
                        onKeyDown={handleKeyDown}
                        rows={2} // Initial row size
                    />
                    <div className='w-full h-11 flex-end p-2'>
                        {message.length > 0 && 
                        <img src= {arrow} className="w-6 h-6 cursor-pointer" onClick={() => {
                            sendData(message);
                        }}></img>}
                    </div>
                </div>
            </div>
            <History percentage={percent} color={color}/>
        </div>
    )
}

export default Content