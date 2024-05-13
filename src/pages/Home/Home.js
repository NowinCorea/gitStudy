import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Home.css';

function Home() {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  const fetchQuizData = async (quizNumber) => {
    setIsLoading(true);

    try {
      const quizInfo = {
      quizId: quizNumber,
      randomMethod: Math.floor(Math.random() * 10)
    }; 
      const response = await 
    fetch(`http://localhost:3001/quiz${quizNumber}`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(quizInfo)
    })

      if (!response.ok) {
        throw new Error(`Error fetching quiz data: ${response.status}`);
      }
      const json = await response.json();
      setQuizData(json);
      console.log(quizData);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizData(1); 

    return () => {
    };
  }, []); 

  const handleSectionClick = async (sectionNumber) => {
    await fetchQuizData(sectionNumber);

    quizData && navigate(`./quiz${sectionNumber}`, { state: { quizData } });
  };

  return (
    <div className="homeWrap">
      <h2>메인 페이지에 오신 것을 환영합니다</h2>
      <p>로그인에 성공하셨습니다.</p>
      <a href="/logout">로그아웃</a>
      <div id="Home">
        {isLoading && <p>Loading...</p>} {/* Display loading indicator */}
        {quizData && (
          <div>
            {/* Use quizData here for quiz content */}
          </div>
        )}
        <div
          className={`section section1`}
          id="section1"
          onClick={() => handleSectionClick(1)}
        >
          Section 1 (Quiz 1)
        </div>
        <div
          className={`section section2`}
          id="section2"
          onClick={() => handleSectionClick(2)}
        >
          Section 2 (Quiz 2)
        </div>

        <div
          className={`section section3`}
          id="section3"
          onClick={() => handleSectionClick(3)}
        >
          Section 3 (Quiz 3)
        </div>

        <div
          className={`section section4`}
          id="section4"
          onClick={() => handleSectionClick(4)}
        >
          Section 4 (Quiz 4)
        </div>
      </div>
    </div>
  );
}

export default Home;