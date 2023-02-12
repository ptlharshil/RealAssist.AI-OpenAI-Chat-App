import './App.css';
import SideBar from "../src/Components/SideBar"
import Navbar from "../src/Components/Navbar"
import Chat from "../src/Components/Chat"
function App() {
  return (
    <div className="App">
      <Navbar/>
      <SideBar/>
      
      {/* <Chat/> */}
    </div>
  );
}

export default App;
