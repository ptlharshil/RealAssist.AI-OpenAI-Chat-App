import React, { useState } from 'react'
import "./Chat.css"
const Chat = ({ chatDetails, setChatDetails, chatIndex, addChat, newTitle, num, setI, setAddChat, addTime, setAddTime, showChat, setShowChat }) => {
    const [chatMsg, setChatMsg] = useState("")
    const [chatState, setChatState] = useState(chatDetails[chatIndex]);
    const { messages, time } = chatState

    const handleChange = (e) => {
        setChatMsg(e.target.value)
    }
    const chatMsgs = (e) => {
        if (e.key === "Enter") {

            const t2 = new Date().getHours() + ":" + new Date().getMinutes();
            const newMessages = [...messages, chatMsg];
            const newTime = [...time, t2];
            const newChatState = { ...chatState, messages: newMessages, time: newTime };
            setChatState(newChatState);

            const newChatDetails = [...chatDetails];
            newChatDetails[chatIndex] = newChatState;
            setChatDetails(newChatDetails);

            setChatMsg("");
        }

    }


    return (
        <div className='chatwindow'>

            {chatDetails[chatIndex].messages.map((chat, i) => {
                return (<div className='message'>
                    <h4 className='msg' key={i}>{chat}</h4>

                </div>)

            })}

            {chatDetails.length > 0 &&
                <div >
                    <div className='fields'>
                        <input type="text" value={chatMsg} className='input' onChange={handleChange} onKeyDown={(e) => chatMsgs(e)} />
                        <button className='audio' >V</button>
                    </div>
                </div>
            }
        </div>
    )

}

export default Chat