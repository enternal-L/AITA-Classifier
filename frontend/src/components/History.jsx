import React from 'react'

const History = ({chats, percentage}) => {

  const percent_yes = percentage[1]
  const percent_no = percentage[0]

  return (
    <>
        <div className='w-full h-[30%] flex flex-center flex-col'>
            <div className='w-44 flex flex-center flex-col'>
              {/* {
                chats && chats.map((item, index) => (
                    <p key = {index}>{item.content}</p>
                ))

                // displays the chats array, since Chats array contains Chat objects
                // to access string we have to do .content
              } */}
              {
                percentage.length > 0 && 
                <div className='w-96 h-full background-yes rounded-md p-4 space-y-3'>
                  <div className={`w-[${percent_yes}%] bg-[#83D1AA] rounded-r-md p-2 flex justify-between`}>
                      <p>{percent_yes}%</p>
                      <p>AH</p>
                  </div>
                  <div className={`w-[${percent_no}%] bg-[#FFB2B2] rounded-r-md p-2 flex justify-between`}>
                      <p>{percent_no}%</p>
                      <p>NTAH</p>
                  </div>
                </div>
              }
            </div>
        </div>
    </>
  )
}

export default History