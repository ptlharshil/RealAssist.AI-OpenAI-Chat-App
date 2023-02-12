import React, { useEffect, useState } from 'react'
import "./SideBar.css"
import Titles from "../Components/Titles"
import Chat from "../Components/Chat"
const SideBar = () => {
    const [showChat,setShowChat]=useState(false)
    const [chatDetails,setChatDetails]=useState([])
    const [addChat, setAddChat]=useState(["Hey, this is Real Assist AI, how can I help you?"])
    const [addTime, setAddTime]=useState([])
    var chatTitle=""

    

    const newChat=()=>{
        const time=new Date()
        const chat={
            title:"New Chat",
            user:"You",
            content:{
                messages: addChat[0],
                time: time.getHours() + ":" + time.getMinutes()
            }
        }
        setChatDetails([...chatDetails,chat])
        setShowChat(true)
        
    }
  return (<>
    <div className='sidebar'>
        <div className='heading'>
            <h2 className='name'>Recent Chats</h2>
            <button className='create' onClick={newChat}>New Chat</button>
        </div>
        
        <Titles chatDetails={chatDetails} setChatDetails={setChatDetails} addChat={addChat}
         setAddChat={setAddChat} addTime={addTime} setAddTime={setAddTime}/>
        
        
    </div>
    {showChat && <Chat chatDetails={chatDetails} setChatDetails={setChatDetails}/>}
    </>
  )
}

export default SideBar