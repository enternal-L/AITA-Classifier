import React from 'react'
import { useState } from 'react'

const Content = ({ onSubmit }) => {
    const [message, setMessage] = useState("")


    return (
        <>
            <div className='w-full'>
                <p>Are you the AH?</p>
                <input 
                    type="text" 
                    placeholder='start yapping here....'
                    value = {message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={() => {onSubmit(message)}}></button> 
                {/* we have to do an arrow function cuz the function 
                    unexpectedly fires for some reason, can't rmb why
                */}
            </div>
        </>
    )
}

export default Content