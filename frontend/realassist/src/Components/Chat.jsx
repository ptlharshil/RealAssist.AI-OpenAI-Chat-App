import React, { useEffect, useState } from 'react'
import "./Chat.css"
const Chat = ({chatDetails, setChatDetails, addChat,newTitle, num, setI, setAddChat, addTime, setAddTime, showChat,setShowChat}) => {
    const [chatMsg,setChatMsg]=useState("")

    // useEffect(()=>{
    //     setChatDetails(...chatDetails)
    //     console.log(chatDetails[num].content.messages)
    // })
    const handleChange=(e)=>{
        setChatMsg(e.target.value)
    }
    const chatMsgs=(e)=>{
        if(e.key==="Enter")
        {
            const time=new Date()
            // setAddChat(...addChat,chatMsg)
            const t2=time.getHours()+ ":" + time.getMinutes()
            // setAddTime(...addTime,t2)
            const chat={
                title: newTitle,
                user:"You",
                content:{
                    messages:[...addChat,chatMsg],
                    time: [...addTime,t2]
                }

            }
            setChatDetails([chat])
            setChatMsg("")
            console.log(chatDetails)
        }
    }
  return (
  <div className='chatwindow'>
    
        {chatDetails[num].content.messages.map((chat,i)=>{
            return(<div className='message'>.
                <h4 className='msg' key={i}>{chat}</h4>
                
            </div>)
        })}
        {chatDetails[num].content.time.map((chat,i)=>{
            return(
                <h6 className='time'>{chat}</h6>
                
            )
        })}

        { chatDetails.length>0 && 
            <div >
                <div className='fields'>
                    <input type="text" value={chatMsg} className='input' onChange={handleChange} onKeyDown={chatMsgs} />
                    <button className='audio' >V</button>
                </div>
            </div>
        }
    </div>
    )

}

export default Chat