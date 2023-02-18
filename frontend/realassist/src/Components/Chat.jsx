import React, { useState } from 'react'
import axios from 'axios'
import "./Chat.css"
const Chat = ({ chatDetails, setChatDetails, chatIndex, addChat, id, newTitle, num, setI, setAddChat, addTime, setAddTime, showChat, setShowChat }) => {
    const [chatMsg, setChatMsg] = useState("")
    const [chatState, setChatState] = useState(chatDetails[chatIndex]);
    const { messages, time } = chatState

    const handleChange = (e) => {
        setChatMsg(e.target.value)
    }
    const chatMsgs = async (e) => {
        if (e.key === "Enter") {

            const t2 = new Date().getHours() + ":" + new Date().getMinutes();
            const newMessages = [...messages, chatMsg];
            const newTime = [...time, t2];
            const user="You"
            const newChatState = { ...chatState,user: user, messages: newMessages, time: newTime };
            setChatState(newChatState);

            const newChatDetails = [...chatDetails];
            newChatDetails[chatIndex] = newChatState;

            const res = await axios.post(`http://localhost:5000/newMsg/${id}`, {user:user, messages: chatMsg, time: t2 })
            setChatDetails(prevChatDetails => prevChatDetails.map(chat => {
                if (chat._id === res.data._id) {
                    return res.data
                }
                return chat
            }));
            setChatMsg("");
            var t3 = '';

            t3 = new Date().getHours() + ":" + new Date().getMinutes()

            const res2 = await axios.post(`http://localhost:5000/chat/${id}`, {user:"AI", messages: chatMsg, time: t3 })
            setChatDetails(prevChatDetails => prevChatDetails.map(chat => {
                if (chat._id === res2.data._id) {
                    return res2.data
                }
                return chat
            }));

        }

    }


    return (
        <div className='chatwindow'>
  <div className="chatMsg">
    {chatDetails[chatIndex].messages.map((chat, i) => {
      const isCurrentUser = chatDetails[chatIndex].user[i] === "You";
      const messageClass = isCurrentUser ? 'message current-user' : 'message other-user';
      const time=isCurrentUser?'time':'time2'
      return (
        <div className="messageWrapper">
          <div className={messageClass}>{chat}</div>
          <div className={time}>{chatDetails[chatIndex].time[i]}</div>
          <div style={{ clear: 'both' }}></div>
        </div>
      );
    })}
  </div>

  {chatDetails.length > 0 &&
    <div className='container'>
      <div className='fields'>
        <input type="text" value={chatMsg} className='input' onChange={handleChange} onKeyDown={(e) => chatMsgs(e)} />
        <button className='audio' >V</button>
      </div>
    </div>
  }
</div>

        // <div className='chatwindow'>
           

        //     <div class="chatMsg">
        //     {chatDetails[chatIndex].messages.map((chat, i) => {
        //         const isCurrentUser = chatDetails[chatIndex].user[i] === "You";
        //         const messageClass = isCurrentUser ? 'message current-user' : 'message other-user';
        //         return (
        //         <div class="messageWrapper">
        //             <div class={messageClass}>{chat}</div>
        //             <div class="time">{chatDetails[chatIndex].time[i]}</div>
        //             <div style={{ clear: 'both' }}></div>
        //         </div>
        //         );
        //     })}
        //     </div>


        //     {chatDetails.length > 0 &&
        //         <div className='container'>
        //             <div className='fields'>
        //                 <input type="text" value={chatMsg} className='input' onChange={handleChange} onKeyDown={(e) => chatMsgs(e)} />
        //                 <button className='audio' >V</button>
        //             </div>
        //         </div>
        //     }
        // </div>
    )

}

export default Chat