import React from 'react'
import "./Navbar.css"
import MenuIcon from '@mui/icons-material/Menu';
const Navbar = () => {
  return (<>
    <div className='navbar'>
      <MenuIcon style={{ marginRight: "1600px", marginTop: "15px" }} />
      <div className='header'>
        <h2><b>RealAssist AI</b></h2>
        <p >This is private message between you and Assistant</p>
      </div>
    </div>
  </>
  )
}

export default Navbar