// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
// import './css/Home.css'; // Import SCSS file

// function Home() {
//   const navigate = useNavigate();
//   const [selectedSection, setSelectedSection] = useState(null);
//   const [quizData, setQuizData] = useState(null);

//   // Function to navigate to Quiz component
//   const navigateToQuiz = (quizNumber) => {
//     navigate(`/quiz${quizNumber}`);
//     const quizInfo ={
//       quizId: quizNumber,
//       randomMethod: Math.floor(Math.random() * 10)
//     } 
//     fetch(`http://localhost:3001/quiz${quizNumber}`,{
//       method:"post",
//       headers:{
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(quizInfo)
//     })
//     .then((res)=>res.json())
//     .then((json)=>{
//       console.log(json);
//       setQuizData(json);
//     })
//     .catch((error)=>{
//       console.log('error on here!', error);
//     })
//   };

//   // Function to handle click on a section
//   const handleSectionClick = (quizNumber) => {
//     console.log(quizNumber);
//     setSelectedSection(quizNumber);
//   };

//   return (
//     <div className="homeWrap">
//       <h2>메인 페이지에 오신 것을 환영합니다</h2>
//       <p>로그인에 성공하셨습니다.</p> 
//       <a href="/logout">로그아웃</a>   
//       <button className="start-button" onClick={() => navigateToQuiz(selectedSection)}>Start Quiz</button>
//       <div id='Home'>
//         <div className={`section ${selectedSection === 1 && 'selected'}`} id="section1" onClick={() => handleSectionClick(1)}>Section 1 (Quiz 1)</div>
//         <div className={`section ${selectedSection === 2 && 'selected'}`} id="section2" onClick={() => handleSectionClick(2)}>Section 2 (Quiz 2)</div>
//         <div className={`section ${selectedSection === 3 && 'selected'}`} id="section3" onClick={() => handleSectionClick(3)}>Section 3 (Quiz 3)</div>
//         <div className={`section ${selectedSection === 4 && 'selected'}`} id="section4" onClick={() => handleSectionClick(4)}>Section 4 (Quiz 4)</div>
//       </div>
//     </div>
//   );
// }

// export default Home;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './css/Home.css'; // Import SCSS file

function Home() {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState(null);
  const [quizData, setQuizData] = useState(null); // State to store quiz data

  // Function to handle click on a section
  const handleSectionClick = (quizNumber) => {
    setSelectedSection(quizNumber);
  };

  // Function to navigate to Quiz component
  const navigateToQuiz = () => {
    if (selectedSection && quizData) { // Check if quizData is not null or undefined
      navigate(`./quiz${selectedSection}`, { state: { quizData } }); // Pass quizData as state
      // console.log(`/quiz${selectedSection}`);
      // console.log({quizData});
      console.log("pass!");
    } else {
      console.log("Please select a section before starting the quiz or wait for quiz data to be fetched.");
    }
  };

  // Function to fetch quiz data
  const fetchQuizData = (quizNumber) => {
    const quizInfo ={
      quizId: quizNumber,
      randomMethod: Math.floor(Math.random() * 10)
    } 
    fetch(`http://localhost:3001/quiz${quizNumber}`,{
      method:"post",
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify(quizInfo)
    })
    .then((res)=>res.json())
    .then((json)=>{
      console.log(json);
      setQuizData(json); // Set quiz data state
    })
    .catch((error) => {
      console.error('Error fetching quiz data:', error);
    });
  };

  return (
    <div className="homeWrap">
      <h2>메인 페이지에 오신 것을 환영합니다</h2>
      <p>로그인에 성공하셨습니다.</p> 
      <a href="/logout">로그아웃</a>   
      <button className="start-button" onClick={navigateToQuiz}>Start Quiz</button>
      <div id='Home'>
        <div className={`section ${selectedSection === 1 && 'selected'}`} id="section1" onClick={() => { handleSectionClick(1); fetchQuizData(1); }}>Section 1 (Quiz 1)</div>
        <div className={`section ${selectedSection === 2 && 'selected'}`} id="section2" onClick={() => { handleSectionClick(2); fetchQuizData(2); }}>Section 2 (Quiz 2)</div>
        <div className={`section ${selectedSection === 3 && 'selected'}`} id="section3" onClick={() => { handleSectionClick(3); fetchQuizData(3); }}>Section 3 (Quiz 3)</div>
        <div className={`section ${selectedSection === 4 && 'selected'}`} id="section4" onClick={() => { handleSectionClick(4); fetchQuizData(4); }}>Section 4 (Quiz 4)</div>
      </div>
    </div>
  );
}

export default Home;