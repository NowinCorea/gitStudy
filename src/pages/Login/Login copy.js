import React, {useState} from 'react';

function Login(props){
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return(
    <>
      <div className="loginWrap">
        <div className="backgroundWrap">
        </div>
        <div className="gameboyWrap">
          <div className="screenWrap">
            <div className="form">
              <h2>로그인</h2>
              <p><input className="login" type="text" name="username" placeholder="아이디" onChange={
                event=>{
                  setPassword(event.target.value);
              }}/></p>
              <p>계정이 없으신가요?</p>
            </div>
          </div>
          <div className="controlWrap">
            <div className="buttonGroup">
              <p><input className="btn" type="submit" value="로그인" onClick={()=>{
                const userData = {
                  userId: id,
                  userPassword: password,
                };
                fetch("http://localhost:3001/login", {
                  method: "post",
                  headers: {
                    "content-type": "application/json"
                  },
                  body: JSON.stringify(userData),
                })
                .then((res) => res.json())
                .then((json) =>{
                  console.log(json);
                  if(json.isLogin=="True"){
                    props.setMode("WELCOME");
                  }
                  else{
                    alert(json.isLogin)
                  }
                });
              }} /></p>
              <button onclick={()=>{
                props.setMode("SIGNIN")
              }}>회원가입</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;