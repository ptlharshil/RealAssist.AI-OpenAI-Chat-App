import './App.css';
import SideBar from "../src/Components/SideBar"
import Navbar from "../src/Components/Navbar"
import Chat from "../src/Components/Chat"
function App() {
  return (
    <div className="App">
      <Navbar/>
      <SideBar/>
      <div className='intro'>
        <h1>Hi, I am Real Assist AI</h1>
        <p>How can I help you? Click on new chat to start
          <br/>
          or
          <br/>
          Click on any of your existing chat to continue
        </p>
      </div>
    </div>
  );
}

export default App;
