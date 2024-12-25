import React from 'react'
import { useState } from 'react'
import arrow from '../assets/arrow.svg'

const Content = ({ onSubmit, fetchChat }) => {
    const [message, setMessage] = useState("")
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
        <div className="flex justify-center items-center bg-white h-[60%]">
            <div className="text-center space-y-6 flex flex-col">
                <p className="text-5xl font-semibold text-gray-700 font-sans">Are you the AH?</p>
                <div className="flex flex-row relative">
                    <input
                        className="w-96 h-12 px-3 pt-2 rounded-md bg-[#d3b894] placeholder-[#3F3E3E] outline-none"
                        type="text"
                        placeholder="start yapping here...."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown = {handleKeyDown}
                        />
                    <img src= {arrow} className="absolute right-2 top-1/2 transform translate-y-[-50%] w-6 h-6 cursor-pointer" onClick={() => {onSubmit(message); fetchChat()}}></img>
                </div>
            </div>
        </div>
    )
}

export default Content