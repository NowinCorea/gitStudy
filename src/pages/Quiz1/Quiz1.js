

import React, { useState, useEffect } from 'react';
import './css/Quiz1.css';
import { useLocation } from 'react-router';

function Quiz1() {
  const { state } = useLocation();
  const [questionCounter, setQuestionCounter] = useState(0);
  const [selections, setSelections] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [randomQuiz, setRandomQuiz] = useState([]);
  const [correctGroup,setCorrectGroup] = useState([]);

  //퀴즈카드색상 정하기
  const [colorGroup,setColorGroup] = useState();

 useEffect(() => {
    let index = 0;
    const tempRandomQuiz = [];
    const correctGroup = [];
    let colorGroup = [];

    let beforeColor = null; // 이전 색상을 추적하기 위한 변수
    const fixColor = () => {
      const randomColor = ["#59D5E0","#F5DD61","#FAA300","#F4538A"];
      let newColor;
      
      do {
        newColor = randomColor[Math.floor(Math.random() * 4)];
      } while (newColor === beforeColor); // 이전 색상과 같은지 확인하고, 다른 색상을 선택합니다.
      
      beforeColor = newColor; // 이전 색상 갱신
      return { newColor, index };
    };

    while (index < 20) {

      let n = Math.floor((Math.random() * 39) + 1);

      if (!sameNum(state.quizData[n].id, tempRandomQuiz)) {
        tempRandomQuiz.push(state.quizData[n]);
        correctGroup.push(state.quizData[n].correct_choice);
        colorGroup.push(fixColor());
        index++;
      }
    }

    setColorGroup(colorGroup);
    setCorrectGroup(correctGroup);
    setRandomQuiz(tempRandomQuiz);
    console.log(colorGroup);
  }, [state.quizData]); 

  function sameNum(n, array) {
    return array.find((e) => e.id === n);
  }

  const choose = (e, index) => {
    const selectedIndex = parseInt(e.target.value);
    const updatedSelections = [...selections];
    updatedSelections[index] = selectedIndex;
    setSelections(updatedSelections);
    console.log(updatedSelections);
    console.log(correctGroup);
    console.log(randomQuiz);
  };

  const displayNext = () => {
    setQuestionCounter(prevCounter => prevCounter + 1);
  };

  const displayPrev = () => {
    setQuestionCounter(prevCounter => prevCounter - 1);
  };

  const displayStartOver = () => {
    setSelections([]);
    setQuestionCounter(0);
    setShowResults(false);
  };

  const displayScore = () => {
  const numCorrect = selections.reduce((acc, selection, index) => {
    if ((selection + 1) === correctGroup[index]) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div>
      <p>총 {randomQuiz.length} 문제 중 {numCorrect} 문제를 맞추셨습니다!</p>
      {/* <p>고른 답{selections}</p>
      <p>정답{correctGroup}</p> */}
      <div className="button" onClick={displayStartOver} id="start">처음부터 다시 시작</div>
    </div>
  )};

const createQuestionElements = () => {
  return randomQuiz.map((question, index) => {
    const { id, question: questionText, choice1, choice2, choice3, choice4, correct_choice} = question;
    const { newColor } = colorGroup[index]; // 해당 인덱스의 색상 가져오기

    return (
      <div className="quizWrap" key={id}>
        <h2 className="quizWrap_title">QUESTION<span style={{color: newColor }}>{id}</span></h2>
        <div className="quizWrap_quizText">
          <p>{questionText}</p>
        </div>
        <form>
          <ul className="quizWrap_list">
            {/* <p>{correct_choice}</p> */}
            {[choice1, choice2, choice3, choice4].map((choice, choiceIndex) => (
              <li key={choiceIndex} style={{borderColor: newColor}}>
                <input
                  type="radio"
                  id={`choice${choiceIndex + 1}-${id}`}
                  name={`question-${id}`}
                  value={choiceIndex}
                  onChange={(e) => choose(e, index)}
                  checked={selections[index] === choiceIndex}
                />
                <label htmlFor={`choice${choiceIndex + 1}-${id}`}>{choice}</label>
              </li>
            ))}
          </ul>
        </form>
      </div>
    );
  });
};

  const handleSubmitQuiz = () => {
    if (selections.some(selection => selection === null)) {
      alert("모든 문제에 답을 선택하세요!");
      return;
    }
    setShowResults(true);
  };  
  const isSubmitButtonVisible = !selections.some(selection => selection === null);

  return (
    <div id="container">
      <div id="quiz" className="quiz">
        {state.quizData.length > 0 ? (
          showResults ? displayScore() : createQuestionElements()
        ) : (
          <p>로딩 중....</p>
        )}
      </div>
      {!showResults && (
        <>
          <div className="button" onClick={displayPrev} id="prev" style={{ display: questionCounter === 0 ? "none" : "inline-block" }}>이전</div>
          <div className="button" onClick={displayNext} id="next">다음</div>
          <div className="button">1개 보기</div>
          <div className="button">5개 보기</div>
          <div className="button">10개 보기</div>
          {isSubmitButtonVisible && <button onClick={handleSubmitQuiz}>결과 보기</button>}
        </>
      )}
    </div>
  );
}

export default Quiz1;

