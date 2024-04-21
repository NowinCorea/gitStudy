import React, { useState } from 'react';

function Login(props) {
  const [id, setId] = useState(""); // 아이디 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  
  // 렌더링 결과를 반환합니다.
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
              // 서버로 로그인 요청을 보냅니다.
              fetch("http://localhost:3001/login", {
                method: "post",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(userData),
              })
                .then((res) => res.json())
                .then((json) => {            
                  console.log(json);
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
  );
}

export default Login;