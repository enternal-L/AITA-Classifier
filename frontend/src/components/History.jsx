import React from 'react'

const History = ({chats}) => {

  return (
    <>
        <div className='w-full'>
            {
              chats && chats.map((item, index) => (
                  <p key = {index}>{item.content}</p>
              ))

              // displays the chats array, since Chats array contains Chat objects
              // to access string we have to do .content
            }
        </div>
    </>
  )
}

export default History