import React, { useState } from 'react';
import './css/Quiz.css';
import { useLocation } from 'react-router';

function Quiz2() {
  const { state } = useLocation();

  const [questionCounter, setQuestionCounter] = useState(0);
  const [selections, setSelections] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const choose = (e, index) => {
    const selectedIndex = parseInt(e.target.value);
    const updatedSelections = [...selections];
    updatedSelections[index] = selectedIndex;
    setSelections(updatedSelections);
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
    const numCorrect = selections.filter((selected, index) => (selected+1) === state.quizData[index].correct_choice).length;
    return (
      <div>
        <p>총 {state.quizData.length} 문제 중 {numCorrect} 문제를 맞추셨습니다!</p>
        <div className="button" onClick={displayStartOver} id="start">처음부터 다시 시작</div>
      </div>
    );
  };

  const createQuestionElements = () => {
    return state.quizData.map((question, index) => {
      const { id, question: questionText, choice1, choice2, choice3, choice4 } = question;
      return (
        <div className="quizWrap" key={id}>
          <h2>질문 {id}</h2>
          <p>{questionText}</p>
          <form>
            <ul>
              {[choice1, choice2, choice3, choice4].map((choice, choiceIndex) => (
                <li key={choiceIndex}>
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
  };  const isSubmitButtonVisible = !selections.some(selection => selection === null);

  return (
    <div id="container">
      <div id="quiz">
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
      {/* {showResults && <div className="button" onClick={displayStartOver} id="start">처음부터 다시 시작</div>} */}
    </div>
  );
}

export default Quiz2;