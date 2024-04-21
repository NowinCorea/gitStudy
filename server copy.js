const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const port = 3001;

const db = require('./lib/db');
const sessionOption = require('./lib/sessionOption');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

app.use(express.static(path.jsoin(__dirname, "/build")));
app.use(bodyPaser.urlencoded({extended: false}));
app.use(bodyParser.json());

let MySQLStore = require('express-mysql-session')(session);
let sessionStore = new MySQLStore(sessionOption);

app.use(session({
  key: 'session_cookie_name',
  secret: '~',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

app.get('/',(req,res)=>{
  req.sendFile(path.join(__dirname, '/build/index.html'));
})

app.get('/authcheck', (req,res)=>{
  console.log(req.session.isLogin);
  const sendData = {isLogin: ""};
  if(req.session.is_logined){
    sendData.isLogin = true;
  }
  else{
    sendData.isLogin = false;
  }
  res.send(sendData);
})

app.post('/login', (req,res)=>{
  const username = req.body.userId;
  const password = req.body.userPassword;
  const sendData = {isLogin: ""};

  if(username && password){
    db.query('select * from usertable where username = ?', [username], function(error, results){
      if(error) throw error;
      console.log(results[0]);
      if(results.length>0){
        bcrypt.compare(password, results[0].password, (err, result)=>{
          if(result === true){
            req.session.is_logined = true;
            req.session.nickname = username;
            req.session.save(function(){
              sendData.isLogin = "True";
              res.send(sendData);
            });
            db.query(`insert into logtable(create,username,action,command,actiondetail) values (now(), ?, 'login', ?,?)`,
            [req.session.nickname, '-', `React 로그인테스트`],function(error, result){});
          } else{
            sendData.isLogin = "로그인 정보가 일치하지 않습니다.";
            res.send(sendData);
          }
        });
      } else{
        sendData.isLogin = "아이디 정보가 일치하지 않습니다.";
        res.send(sendData);
      }
    });
  } else{
    sendData.isLogin = "아이디와 비밀번호를 입력하세요.";
    res.send(sendData);
  }
});
