import React from 'react'
import logo from '/logo.png'

const Nav = ({color}) => {
  return (
    <div className='flex items-center justify-between h-[7%] p-3 transition-colors duration-500 ease-in-out' style={{ backgroundColor: color }}>
      <a className='w-8 h-8 cursor-pointer' href="https://github.com/enternal-L/AITA-Classifier" target = "_blank">
        <img src= {logo} className="w-full h-full"></img>
      </a>
      <h1 className='cursor-pointer'>History Mode | Chat Mode</h1>
    </div>
  )
}

export default Nav