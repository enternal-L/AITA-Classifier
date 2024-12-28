import React from 'react'
import { useState } from 'react'
import arrow from '../assets/arrow.svg'
import History from './History'

const Content = ({ onSubmit, fetchChat }) => {
    const [message, setMessage] = useState("")
    const [percent, setPercent] = useState([])
    // message is what we're typing in

    const handleKeyDown = (event) => {
        if(event.key === "Enter" && message !== ""){
            event.preventDefault();

            console.log("Enter is submitting", message);

            onSubmit(message);
            fetchChat();
        }
    }

    return (
        <div className="flex-center bg-white h-[93%] flex-col">
            <div className="text-center space-y-6 flex flex-col m-4">
                <p className="text-5xl font-semibold text-gray-700 font-sans">Are you the AH?</p>
                <div className="flex flex-row relative">
                    <textarea
                        className="w-96 h-12 px-3 pt-2 rounded-md bg-[#d3b894] placeholder-[#3F3E3E] outline-none"
                        type="text"
                        placeholder="start yapping here...."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown = {handleKeyDown}
                        />
                    <img src= {arrow} className="absolute right-2 bottom-0 transform translate-y-[-50%] w-6 h-6 cursor-pointer" onClick={() => {onSubmit(message); fetchChat(); setPercent([30, 70])}}></img>
                </div>
            </div>
            <History percentage={percent}/>
        </div>
    )
}

export default Content