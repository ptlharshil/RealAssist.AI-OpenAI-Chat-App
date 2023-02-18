import './App.css';
import SideBar from "../src/Components/SideBar"
import Navbar from "../src/Components/Navbar"
import { useState, useEffect } from 'react'
import * as React from 'react';
import Chat from "../src/Components/Chat"
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import axios from 'axios'
import "../src/Components/SideBar.css"
function App() {

  const [showChat, setShowChat] = useState(false)
  const [chatDetails, setChatDetails] = useState([])
  const [addChat, setAddChat] = useState(["Hey, this is Real Assist AI, how can I help you?"])
  const [addTime, setAddTime] = useState()
  const [num, setNum] = useState()
  const [show, setShow] = useState(false)
  const [newTitle, setNewTitle] = useState("New Chat")
  const [id, setId] = useState()
  useEffect(() => {
    getAllChats()
  }, [])

  const getAllChats = async () => {
    try {
      const res = await axios.get("http://localhost:5000")
      setChatDetails(res.data)
    } catch (err) {
      console.log(err)
    }
  }
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
    chatDetails.map((cd, i) => {
      if (index === i) {
        setShow(true)
        setNum(i)
      }
    })
  };

  const handleNo = () => {
    setShow(false)
    setShowChat(true)
  }
  const handleYes = async (newTitle, index) => {

    const res = await axios.put(`http://localhost:5000/editTitle/${index}`, { title: newTitle })

    const updatedChat = res.data
    setChatDetails(prevChatDetails => prevChatDetails.map(chat => {
      if (chat._id === updatedChat._id) {
        return updatedChat
      }
      return chat
    }))
    setShow(false)
    setShowChat(true)

  }
  const handleText = (e) => {
    setNewTitle(e.target.value)
  }
  const deleteChat = async (index) => {

    const res = await axios.delete(`http://localhost:5000/deleteChat/${index}`)
    setChatDetails(chatDetails.filter((chat, i) => index !== chat._id))

  }


  const newChat = async () => {
    const time = new Date()
    const chat = {
      title: "New Chat",
      user: "AI",
      messages: addChat,
      time: time.getHours() + ":" + time.getMinutes()

    }
    
    try {
      const res = await axios.post("http://localhost:5000/api/newChat", chat)
      setChatDetails([...chatDetails, res.data])
    } catch (err) {
      console.log(err.response)
    }

  }

  return (
    <div className="App">
      <Navbar/>
      {/* <SideBar/> */}
      <div className='heading'>
          <h2 className='name'>Recent Chats</h2>
          <button className='create' onClick={newChat}>New Chat</button>
        </div>
      
      <div className='sidebar'>
        


        
          {chatDetails.map((chats, index) =>
            <div>
              

              <div className="chatnames">
                {show && num === index ?
                  <div>

                    <TextField
                      required
                      id="filled-required"
                      label="Required"
                      defaultValue={chats.title}
                      variant="filled"
                      onChange={handleText}
                      style={{ marginRight: "35px", marginTop: "-5px" }}
                    />
                    <ButtonGroup
                      disableElevation
                      variant="contained"
                      aria-label="Disabled elevation buttons"
                    >
                      <Button onClick={() => handleYes(newTitle, chats._id)}>Yes</Button>
                      <Button onClick={handleNo}>No</Button>
                    </ButtonGroup>



                  </div>
                  :<div className='wrap'>
                  {/* <ul>

                      <li > */}
                        <h3 className='title' onClick={() => {
                          setNum(index);setAddTime(index);
                          setId(chats._id)
                          setShowChat(true);
                        }}>
                          {chats.title}
                        </h3>

                      {/* </li>
                    </ul> */}

                    <div className='box'>
                      <FormControl >
                        <Select
                          labelId="demo-customized-select-label"
                          id="demo-customized-select"
                          input={<BootstrapInput />}
                          key={chats._id}
                        >

                          <MenuItem value={10} onClick={() => handleChange(index)}>Edit</MenuItem>
                          <MenuItem value={20} onClick={() => deleteChat(chats._id)}>Delete</MenuItem>
                        </Select>
                      </FormControl>
                    </div>

                    


                  </div>}

              </div>

            </div>)}



        </div>



    
    
      
        {showChat && addTime===num ? <Chat chatDetails={chatDetails} id={id}
                setChatDetails={setChatDetails} chatIndex={addTime}
              />:
              <div className='intro'>
          <h1>Hi, I am Real Assist AI</h1>
          <p>How can I help you? Click on new chat to start
            <br/>
            or
            <br/>
            Click on any of your existing chat to continue
          </p>
        </div>
        }
      
    
    
        
    </div>
  );
}

export default App;
