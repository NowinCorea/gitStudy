import React, { useState } from 'react';

function Signin(props) {
  const [id, setId] = useState(""); // 아이디 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [password2, setPassword2] = useState(""); // 비밀번호 확인 상태

  // 렌더링 결과를 반환합니다.
  return (
    <>
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
          // 서버로 회원가입 요청을 보냅니다.
          fetch("http://localhost:3001/signin", {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userData),
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
  );
}

export default Signin;