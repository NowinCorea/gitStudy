import './appcss/app.css';
import {useState, useEffect} from 'react';
import {Route, Routes, Link} from 'react-router-dom';

import Quiz1 from './pages/Quiz1/Quiz1';
import Quiz2 from './pages/Quiz2/Quiz2';
import Quiz3 from './pages/Quiz3/Quiz3';
import Quiz4 from './pages/Quiz4/Quiz4';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signin from './pages/Login/Signin';

function App(){
  const [mode, setMode] = useState("");
  useEffect(()=>{
    fetch("http://localhost:3001/authcheck")
    .then((res)=>res.json())
    .then((json)=>{
      if(json.isLogin){
        setMode("WELCOME");
      }
      else{
        setMode("LOGIN");
      }
    });
  }, []);

  let content = null;

  if(mode ==="LOGIN"){
    content = <Login setMode={setMode}></Login>
  }
  else if(mode === "SIGNIN"){
    content = <Signin setMode={setMode}></Signin>
  }
  else if(mode === "WELCOME"){
    content= 
    <>
      <div className = "App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/quiz">About</Link>
          <button onClick={()=>{console.log(1)}}>문제불러오기</button>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz1" element={<Quiz1/>} />
          <Route path="/quiz2" element={<Quiz2/>} />
          <Route path="/quiz3" element={<Quiz3/>} />
          <Route path="/quiz4" element={<Quiz4/>} />
        </Routes>
      </div>
    </>
  }

  return(
    <>
      <div className="loginWrap">
        {content}
      </div>
    </>
  )


}