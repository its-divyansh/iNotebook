import React, { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './contexts/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';


function App() {
  const [alert,setAlert]= useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    });
    setTimeout(()=>{   //setTimeout(func(to be executed),after this much millisecond)
      setAlert(null)
    },1800);

  }
  return (
     <NoteState>

      <Router>

       <div className="App" >
        <Navbar/>

        <Alert alert={alert}/>

        <Routes>
          
          <Route exact path="/" element ={<Home showAlert={showAlert}/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}/>
          <Route exact path='/login' element={<Login showAlert={showAlert}/>}/>

        </Routes>
        
       </div>
     </Router>
     </NoteState>
    
  );
}

export default App;
