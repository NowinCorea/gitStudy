const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const port = 3001;

// db 가져오기
const db = require('./lib/db');
const sessionOption = require('./lib/sessionOption');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

app.use(express.static(path.join(__dirname,'/build')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//json가져오기
const quizJson = require('./lib/quizJson.json');

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
});

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
});

app.get('/logout', function (req,res){
  req.session.destroy(function(err){
    res.redirect('/');
  });
});

app.post('/login', (req,res)=>{
  const username = req.body.userId;
  const password = req.body.userPassword;
  const sendData = {isLogin: ""};

  if(username && password){
    db.query('select * from usertable where username = ?',[username],function(error, results){
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
            db.query(`insert into logtable (created,username,action, command, actiondetail) values(now(), ?, 'login', ?, ?)`,
            [req.session.nickname, '-', `React 로그인 테스트`],function(error, result){});
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
  } else {
    sendData.isLogin = "아이다와 비밀번호를 입력하세요!";
    res.send(sendData);
  }
});

app.post(`/quiz1`, (req,res)=>{
  const randomNumber = (Math.floor(Math.random() * 40 + 1));
  const quizid = req.body.quizId;
  const random = req.body.randomMethod;
  db.query(`select * from quiztable${quizid}`,function(error,results){
    const sendData = results;
    res.send(sendData);
  })
})

app.post('/quiz2', (req,res)=>{
  const quizid = req.body.quizId;
  const random = req.body.randomMethod;
  db.query(`select * from quiztable${quizid}`,function(error,results){
    const sendData = results;
    res.send(sendData);
  })
})

app.post('/quiz3', (req,res)=>{
  const quizid = req.body.quizId;
  const random = req.body.randomMethod;
  db.query(`select * from quiztable${quizid}`,function(error,results){
    const sendData = results;
    res.send(sendData);
  })
})

app.post('/quiz4', (req,res)=>{
  const quizid = req.body.quizId;
  const random = req.body.randomMethod;
  db.query(`select * from quiztable${quizid}`,function(error,results){
    const sendData = results;
    res.send(sendData);
  })
})

app.post('signin',(req,res)=>{
  const username = req.body.userId;
  const password = req.body.userPassword;
  const password2 = req.body.userPassword2;

  const sendData = {isSuccess: ""};

  if(username && password && password2){
    db.query(`select * from usertable where username = ?`,[username],function(error,results){
      if(error) throw error;
      if(results.length <= 0 && password === password2){
        const hasedPassword = bcrypt.hashSync(password,10);
        db.query(`insert into usertable(username, password) values(?,?)`,[username, hasedPassword], function(error, data){
          if(error) throw error;
          req.session.save(function(){
            sendData.isSuccess = "True";
            res.send(sendData);
          });
        });
      } else if (password !== password2){
        sendData.isSuccess = "입력된 비밀번호가 서로 다릅니다.";
        res.send(sendData);
      }
      else{
        sendData.isSuccess = "이미 존재하는 아이디입니다."
        res.send(sendData);
      }
    });
  } else{
    sendData.isSuccess = "아이디와 비밀번호를 입력하세요!";
    res.send(sendData);
  }
});

app.listen(port, ()=>{
  console.log(`example app listening at http://localhost:${port}`)
})

// // express 모듈을 불러옵니다.
// const express = require('express');
// // express-session 모듈을 불러옵니다.
// const session = require('express-session');
// // path 모듈을 불러옵니다.
// const path = require('path');
// // express 애플리케이션을 생성합니다.
// const app = express();
// // 서버가 동작할 포트를 설정합니다.
// const port = 3001;

// // db.js에서 내보내는 MySQL 데이터베이스 연결 객체를 불러옵니다.
// const db = require('./lib/db');
// // sessionOption.js에서 내보내는 세션 설정 옵션을 불러옵니다.
// const sessionOption = require('./lib/sessionOption');
// // body-parser 모듈을 불러옵니다. POST 요청의 본문 데이터를 파싱할 때 사용합니다.
// const bodyParser = require("body-parser");
// // bcrypt 모듈을 불러옵니다. 비밀번호 해시 및 비교에 사용합니다.
// const bcrypt = require('bcrypt');


// // 정적 파일 경로를 설정합니다.
// app.use(express.static(path.join(__dirname, '/build')));
// // POST 요청의 본문 데이터를 URL-encoded 형식으로 파싱합니다.
// app.use(bodyParser.urlencoded({ extended: false }));
// // POST 요청의 본문 데이터를 JSON 형식으로 파싱합니다.
// app.use(bodyParser.json());

// // MySQL 데이터베이스를 사용한 세션 저장소를 생성합니다.
// let MySQLStore = require('express-mysql-session')(session);
// let sessionStore = new MySQLStore(sessionOption);

// // 세션 설정을 적용합니다.
// app.use(session({  
//     key: 'session_cookie_name', // 세션 쿠키의 이름을 설정합니다.
//     secret: '~', // 세션을 암호화할 비밀 키를 설정합니다.
//     store: sessionStore, // MySQL을 이용한 세션 저장소를 설정합니다.
//     resave: false, // 세션이 변경되지 않으면 재저장하지 않습니다.
//     saveUninitialized: false // 초기화되지 않은 세션을 저장하지 않습니다.
// }));

// // 루트 경로에 대한 GET 요청을 처리합니다.
// app.get('/', (req, res) => {    
//     // 정적 파일을 반환합니다.
//     req.sendFile(path.join(__dirname, '/build/index.html'));
// });

// // 로그인 여부를 확인하는 GET 요청을 처리합니다.
// app.get('/authcheck', (req, res) => {      
//     // 로그인 여부를 확인할 데이터 객체를 생성합니다.
//     console.log(req.session.isLogin);
//     const sendData = { isLogin: "" };
//     if (req.session.is_logined) { // 세션에 로그인 정보가 있는지 확인합니다.
//         sendData.isLogin = true;
//     } else {
//         sendData.isLogin = false;
//     }
//     // 데이터 객체를 클라이언트에 반환합니다.
//     res.send(sendData);
// });

// // 로그아웃을 처리합니다.
// app.get('/logout', function (req, res) {
//     // 세션을 파기합니다.
//     req.session.destroy(function (err) {
//         // 루트 경로로 리다이렉트합니다.
//         res.redirect('/');
//     });
// });

// // 로그인 요청을 처리합니다.
// app.post("/login", (req, res) => {
//     // 클라이언트에서 전달된 사용자 ID와 비밀번호를 가져옵니다.
//     const username = req.body.userId;
//     const password = req.body.userPassword;
//     const sendData = { isLogin: "" };

//     // 사용자 ID와 비밀번호가 모두 입력되었는지 확인합니다.
//     if (username && password) {            
//         // 데이터베이스에서 입력된 사용자 ID가 존재하는지 확인합니다.
//         db.query('SELECT * FROM userTable WHERE username = ?', [username], function (error, results ) {
//             if (error) throw error; // 오류가 발생하면 예외를 발생시킵니다.
//             console.log(results[0]);
//             if (results.length > 0) { // 사용자가 존재하는 경우
//                 // 입력된 비밀번호와 데이터베이스에 저장된 해시된 비밀번호를 비교합니다.
//                 bcrypt.compare(password, results[0].password, (err, result) => {
//                     if (result === true) { // 비밀번호가 일치하는 경우
//                         // 세션 정보를 업데이트합니다.
//                         req.session.is_logined = true;
//                         req.session.nickname = username;
//                         req.session.save(function () {
//                             // 로그인 성공 상태를 클라이언트에 반환합니다.
//                             sendData.isLogin = "True";
//                             res.send(sendData);
//                         });
//                         // 로그 기록을 데이터베이스에 저장합니다.
//                         db.query(`INSERT INTO logTable (created, username, action, command, actiondetail) VALUES (NOW(), ?, 'login', ?, ?)`
//                             , [req.session.nickname, '-', `React 로그인 테스트`], function (error, result) { });
//                     } else { // 비밀번호가 일치하지 않는 경우
//                         sendData.isLogin = "로그인 정보가 일치하지 않습니다.";
//                         res.send(sendData);
//                     }
//                 });
//             } else { // 사용자가 존재하지 않는 경우
//                 sendData.isLogin = "아이디 정보가 일치하지 않습니다.";
//                 res.send(sendData);
//             }
//         });
//     } else { // 사용자 ID나 비밀번호가 입력되지 않은 경우
//         sendData.isLogin = "아이디와 비밀번호를 입력하세요!";
//         res.send(sendData);
//     }
// });

// // 회원가입 요청을 처리합니다.
// app.post("/signin", (req, res) => {
//     // 클라이언트에서 전달된 사용자 ID, 비밀번호, 비밀번호 확인을 가져옵니다.
//     const username = req.body.userId;
//     const password = req.body.userPassword;
//     const password2 = req.body.userPassword2;

//     const sendData = { isSuccess: "" };

//     // 사용자 ID, 비밀번호, 비밀번호 확인이 모두 입력되었는지 확인합니다.
//     if (username && password && password2) {
//         // 데이터베이스에서 입력된 사용자 ID가 존재하는지 확인합니다.
//         db.query('SELECT * FROM userTable WHERE username = ?', [username], function (error, results) {
//             if (error) throw error; // 오류가 발생하면 예외를 발생시킵니다.
//             if (results.length <= 0 && password === password2) { // 사용자 ID가 존재하지 않고, 비밀번호가 일치하는 경우
//                 // 비밀번호를 해시합니다.
//                 const hasedPassword = bcrypt.hashSync(password, 10);
//                 // 데이터베이스에 사용자 ID와 해시된 비밀번호를 저장합니다.
//                 db.query('INSERT INTO userTable (username, password) VALUES (?, ?)', [username, hasedPassword], function (error, data) {
//                     if (error) throw error;
//                     // 세션을 저장합니다.
//                     req.session.save(function () {
//                         sendData.isSuccess = "True";
//                         res.send(sendData);
//                     });
//                 });
//             } else if (password !== password2) { // 비밀번호가 일치하지 않는 경우
//                 sendData.isSuccess = "입력된 비밀번호가 서로 다릅니다.";
//                 res.send(sendData);
//             } else { // 사용자 ID가 이미 존재하는 경우
//                 sendData.isSuccess = "이미 존재하는 아이디 입니다!";
//                 res.send(sendData);
//             }
//         });
//     } else { // 사용자 ID, 비밀번호, 비밀번호 확인이 모두 입력되지 않은 경우
//         sendData.isSuccess = "아이디와 비밀번호를 입력하세요!";
//         res.send(sendData);
//     }
// });

// // 서버를 지정된 포트에서 실행합니다.
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });

