import  { useEffect, useState } from 'react'
import * as React from 'react';
import Chat from "../Components/Chat"
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import "./SideBar.css"
import Titles from "../Components/Titles"
const SideBar = () => {
    const [showChat,setShowChat]=useState(false)
    const [chatDetails,setChatDetails]=useState([])
    const [addChat, setAddChat]=useState(["Hey, this is Real Assist AI, how can I help you?"])
    const [addTime, setAddTime]=useState([])
    var chatTitle=""
    const [num,setNum]=useState('')
    const [show, setShow]=useState(false)
    const [newTitle,setNewTitle]=useState("New Chat")
    // const [i,setI]=useState('')
    
    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        'label + &': {
          marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
          borderRadius: 4,
          position: 'relative',
          backgroundColor: theme.palette.background.paper,
          border: '1px solid #ced4da',
          fontSize: 16,
          padding: '10px 26px 10px 12px',
          transition: theme.transitions.create(['border-color', 'box-shadow']),
          // Use the system font instead of the default Roboto font.
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
          '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
          },
        },
      }));

      
        const handleChange = (index) => {
          chatDetails.map((cd,i)=>{
            if(index===i)
            {
                setShow(true)    
                setNum(i)
                setShowChat(true)
            }
          })
        };

        const handleNo=()=>{
            setShow(false)
            setShowChat(true)
        }
        const handleYes=(newTitle,index)=>{
            chatDetails.map((cd,i)=>{
                if(index===i)
                {
                    cd.title=newTitle
                }
              })
              setChatDetails([...chatDetails])
              setShow(false) 
              setShowChat(true)   

        }
        const handleText=(e)=>{
            setNewTitle(e.target.value)
        }
    const deleteChat=(index)=>{
          setChatDetails(chatDetails.filter((chat,i)=>index!==i))
          
    }
    const handleChatRoom=(index)=>{
        
            
            setNum(index)
            
    
    }







    

    const newChat=()=>{
        const time=new Date()
        addTime.push(time.getHours() + ":" + time.getMinutes())
        const chat={
            title:"New Chat",
            user:"You",
            content:{
                messages:addChat,
                time: addTime
            }
        }
        {chatDetails.length===0 && setNum(0)}
        // chatDetails.push(chat)
        setChatDetails([...chatDetails,chat])
        setShowChat(true)
        console.log(chatDetails)
    }

    
  return (<>
    <div className='sidebar'>
        <div className='heading'>
            <h2 className='name'>Recent Chats</h2>
            <button className='create' onClick={newChat}>New Chat</button>
        </div>
        
        {/* <Titles chatDetails={chatDetails} setChatDetails={setChatDetails} showChat={showChat} 
         setShowChat={setShowChat} addChat={addChat}
         setAddChat={setAddChat} addTime={addTime} setAddTime={setAddTime}/> */}
        
        <>
    { chatDetails.map((chats,index)=>
    
    <div className='chatnames'>
       
        {show && num===index ?<> <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue={chats.title}
          variant="filled"
          onChange={handleText}
          style={{marginRight:"55px", marginTop:"-42px"}}/>
          <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button onClick={()=>handleYes(newTitle,index)}>Yes</Button>
          <Button onClick={handleNo}>No</Button>
        </ButtonGroup></>
        :<> <h3 key={index} className="title" onClick={()=>handleChatRoom(index)} style={{cursor:"pointer"}}>{chats.title}</h3>
        <FormControl  style={{margin:"5px 5px 5px 5px"}}>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          input={<BootstrapInput />}
          key={index}
        >
            
          <MenuItem value={10} onClick={()=>handleChange(index)}>Edit</MenuItem>
          <MenuItem value={20} onClick={()=>deleteChat(index)}>Delete</MenuItem>
        </Select>
      </FormControl>
            
      {showChat && index===num && <Chat chatDetails={chatDetails} newTitle={newTitle} 
      setChatDetails={setChatDetails} num={num} addChat={addChat} addTime={addTime}
          />}
      </>}         
    </div>)}

    
    
    

   
    </>
        
    </div>
    {/* {showChat && <Chat chatDetails={chatDetails} setChatDetails={setChatDetails} addChat={addChat} 
             i={i} setI={setI} setAddChat={setAddChat} addTime={addTime} setAddTime={setAddTime} 
             showChat={showChat} setShowChat={setShowChat}/>} */}
   
    </>
  )
}

export default SideBar