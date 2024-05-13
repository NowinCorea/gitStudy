import './appcss/app.css';
import {useState, useEffect} from 'react';
import {Route, Routes, Link} from 'react-router-dom';

import Quiz1 from './pages/Quiz1/Quiz1';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

function App(){
  const [mode, setMode] = useState("");
  useEffect(()=>{
    fetch("http://localhost:3001/authcheck")
    .then((res) => res.json())
    .then((json) =>{
      if(json.isLogin){
        setMode("WELCOME")
      }
      else{
        setMode("LOGIN");
      }
    });
  },[]);

  let content = null;

  if(mode==="LOGIN"){
    content=<Login setMode={setMode}></Login>
  }
  else if(mode==="SIGNIN"){
    content = <Singin setMode={setMode}></Singin>
  }
  else if(mode==="WELCOME"){
    content=<>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz1" element={<Quiz1/>} />
      </Routes>
    </div>
    </>
  }

  return(
    <>
      {content}
    </>
  )
}

export default App;