import React from 'react'
import { useState } from 'react'

const Content = ({ onSubmit }) => {
    const [message, setMessage] = useState("")
    // message is what we're typing in

    return (
        <div className="app flex justify-center items-center h-screen bg-white">
            <div className="text-center space-y-6">
                <p className="text-lg font-semibold text-gray-700">Are you the AH?</p>
                <input
                    className="w-80 p-3 rounded-md bg-[#d3b894] text-gray-800 placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-[#c5a376]"
                    type="text"
                    placeholder="start yapping here...."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    />
                <button
                    className="hidden" // Hides the button while keeping the layout functional
                    onClick={() => {
                        onSubmit(message);}}
                ></button>
            </div>
        </div>
    )
}

export default Content