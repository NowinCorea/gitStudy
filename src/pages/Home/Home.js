import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './css/Home.css'; // Import SCSS file

function Home() {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState(null);

  // Function to navigate to Quiz component
  const navigateToQuiz = (quizNumber) => {
    navigate(`/quiz${quizNumber}`);
  };

  // Function to handle click on a section
  const handleSectionClick = (quizNumber) => {
    console.log(quizNumber);
    setSelectedSection(quizNumber);
  };

  return (
    <div className="homeWrap">
      <h2>메인 페이지에 오신 것을 환영합니다</h2>
      <p>로그인에 성공하셨습니다.</p> 
      <a href="/logout">로그아웃</a>   
      <button className="start-button" onClick={() => navigateToQuiz(selectedSection)}>Start Quiz</button>
      <div id='Home'>
        <div className={`section ${selectedSection === 1 && 'selected'}`} id="section1" onClick={() => handleSectionClick(1)}>Section 1 (Quiz 1)</div>
        <div className={`section ${selectedSection === 2 && 'selected'}`} id="section2" onClick={() => handleSectionClick(2)}>Section 2 (Quiz 2)</div>
        <div className={`section ${selectedSection === 3 && 'selected'}`} id="section3" onClick={() => handleSectionClick(3)}>Section 3 (Quiz 3)</div>
        <div className={`section ${selectedSection === 4 && 'selected'}`} id="section4" onClick={() => handleSectionClick(4)}>Section 4 (Quiz 4)</div>
      </div>
    </div>
  );
}

export default Home;