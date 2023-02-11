import React, { useState } from 'react'
import "./SideBar.css"
const SideBar = () => {
    const [showChat,setShowChat]=useState(false)

    const newChat=()=>{
        setShowChat(true)

    }
  return (
    <div className='sidebar'>
        <div className='heading'>
            <h2 className='name'>Recent Chats</h2>
            <button className='create' onClick={newChat}>New Chat</button>
        </div>
        {showChat===true && 
            <div className='chatnames'>
                <h3 className='title'>New Chat</h3>
                <button className='edit'>Edit</button>
            </div>
        }
    </div>
  )
}

export default SideBar