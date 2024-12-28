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
                <div className="w-96 min-h-24 flex flex-col flex-grow rounded-md bg-[#d3b894]">
                    <textarea
                        className="w-full h-3/5 px-3 p-2 rounded-md bg-[#d3b894] placeholder-[#3F3E3E] outline-none resize-none overflow-hidden"
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
                        <img src= {arrow} className="w-6 h-6 cursor-pointer" onClick={() => {onSubmit(message); fetchChat(); setPercent([30, 70])}}></img>
                    </div>
                </div>
            </div>
            <History percentage={percent}/>
        </div>
    )
}

export default Content