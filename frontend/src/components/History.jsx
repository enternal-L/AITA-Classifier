import React from 'react'

const History = ({chats}) => {

  return (
    <>
        <div className='w-full h-[30%] flex flex-center flex-col'>
            <div className='w-44 flex flex-center flex-col'>
              {
                chats && chats.map((item, index) => (
                    <p key = {index}>{item.content}</p>
                ))

                // displays the chats array, since Chats array contains Chat objects
                // to access string we have to do .content
              }
            </div>
        </div>
    </>
  )
}

export default History