import React from 'react'

const History = ({chats}) => {
  return (
    <>
        <div className='w-full'>
            {
              chats && chats.map((item, index) => (
                  <p key = {index}>{item}</p>
              ))
            }
        </div>
    </>
  )
}

export default History