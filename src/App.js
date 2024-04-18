import './appcss/app.css';
import { useState,useEffect  } from 'react';
import { Route, Routes, Link} from 'react-router-dom'; 
import Quiz1 from './pages/Quiz1/Quiz1';
import Quiz2 from './pages/Quiz2/Quiz2';
import Quiz3 from './pages/Quiz3/Quiz3';
import Quiz4 from './pages/Quiz4/Quiz4';
import Home from './pages/Home/Home'; 

function Login(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <>
      <div className="gameboyWrap">
        <div className="screenWrap">
          <div className="form">
            <h2>로그인</h2>
            <p><input className="login" type="text" name="username" placeholder="아이디" onChange={event => {
              setId(event.target.value);
            }} /></p>
            <p><input className="login" type="password" name="pwd" placeholder="비밀번호" onChange={event => {
              setPassword(event.target.value);
            }} /></p>


            <p>계정이 없으신가요? </p>
          </div>
        </div>
        <div className="controlWrap">
          <div className="buttonGroup">
            <p><input className="btn" type="submit" value="로그인" onClick={() => {
              const userData = {
                userId: id,
                userPassword: password,
              };
              fetch("http://localhost:3001/login", { //auth 주소에서 받을 예정
                method: "post", // method :통신방법
                headers: {      // headers: API 응답에 대한 정보를 담음
                  "content-type": "application/json",
                },
                body: JSON.stringify(userData), //userData라는 객체를 보냄
              })
                .then((res) => res.json())
                .then((json) => {            
                  if(json.isLogin==="True"){
                    props.setMode("WELCOME");
                  }
                  else {
                    alert(json.isLogin)
                  }
                });
            }} /></p>
            <button onClick={() => {
              props.setMode("SIGNIN");
            }}>회원가입</button>
          </div>
        </div>

      </div>
    </>
)}


function Signin(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  return <>
    <h2>회원가입</h2>

    <div className="form">
      <p><input className="login" type="text" placeholder="아이디" onChange={event => {
        setId(event.target.value);
      }} /></p>
      <p><input className="login" type="password" placeholder="비밀번호" onChange={event => {
        setPassword(event.target.value);
      }} /></p>
      <p><input className="login" type="password" placeholder="비밀번호 확인" onChange={event => {
        setPassword2(event.target.value);
      }} /></p>

      <p><input className="btn" type="submit" value="회원가입" onClick={() => {
        const userData = {
          userId: id,
          userPassword: password,
          userPassword2: password2,
        };
        fetch("http://localhost:3001/signin", { //signin 주소에서 받을 예정
          method: "post", // method :통신방법
          headers: {      // headers: API 응답에 대한 정보를 담음
            "content-type": "application/json",
          },
          body: JSON.stringify(userData), //userData라는 객체를 보냄
        })
          .then((res) => res.json())
          .then((json) => {
            if(json.isSuccess==="True"){
              alert('회원가입이 완료되었습니다!')
              props.setMode("LOGIN");
            }
            else{
              alert(json.isSuccess)
            }
          });
      }} /></p>
    </div>

    <p>로그인화면으로 돌아가기  <button onClick={() => {
      props.setMode("LOGIN");
    }}>로그인</button></p>
  </> 
}

function App() {
  const [mode, setMode] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/authcheck")
      .then((res) => res.json())
      .then((json) => {        
        if (json.isLogin === "True") {
          setMode("WELCOME");
        }
        else {
          setMode("LOGIN");
        }
      });
  }, []); 

  let content = null;  

  if(mode==="LOGIN"){
    content = <Login setMode={setMode}></Login> 
  }
  else if (mode === 'SIGNIN') {
    content = <Signin setMode={setMode}></Signin> 
  }
  else if (mode === 'WELCOME') {
    content = <>
    <div className="App">      
      <nav>
        <Link to="/">Home</Link> |  
        <Link to="/quiz">About</Link> | 
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

  return (
    <>
      <div className="loginWrap">
          {content}
      </div>
    </>
  );
}

export default App;
//script
// "start": "react-scripts start",