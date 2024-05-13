// 필요한 CSS 파일을 불러옵니다.
import './appcss/app.css';
// React 훅과 라우터 관련 모듈을 불러옵니다.
import { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
// 퀴즈 페이지 컴포넌트를 불러옵니다.
import Quiz1 from './pages/Quiz1/Quiz1';
import Quiz2 from './pages/Quiz2/Quiz2';
import Quiz3 from './pages/Quiz3/Quiz3';
import Quiz4 from './pages/Quiz4/Quiz4';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signin from './pages/Login/Signin';

// 애플리케이션 컴포넌트를 정의합니다.
function App() {
  const [mode, setMode] = useState(""); // 모드 상태
  // 컴포넌트가 마운트될 때 로그인 상태를 확인합니다.
  useEffect(() => {
    fetch("http://localhost:3001/authcheck")
      .then((res) => res.json())
      .then((json) => {        
        if (json.isLogin) {
          setMode("WELCOME");
        }
        else {
          setMode("LOGIN");
        }
      });
  }, []); 

  let content = null;  

  // 현재 모드에 따라 컴포넌트를 렌더링합니다.
  if(mode==="LOGIN"){
    content = <Login setMode={setMode}></Login> 
  }
  else if (mode === 'SIGNIN') {
    content = <Signin setMode={setMode}></Signin> 
  }
  else if (mode === 'WELCOME') {
    content = <>
    <div className="App">      
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

  // 애플리케이션을 렌더링합니다.
  return (
    <>
      {content}
    </>
  );
}

// 애플리케이션을 내보냅니다.
export default App;