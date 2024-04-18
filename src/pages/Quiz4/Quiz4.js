import React, { useState, useEffect } from 'react';
import './css/Quiz.css';
import questionsData from "./questions.json";

function Quiz4() {
  const [questionCounter, setQuestionCounter] = useState(0);
  const [selections, setSelections] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionsPerPage, setQuestionsPerPage] = useState(5);

  useEffect(() => {
    if (questionsData && questionsData.length > 0) {
      setQuestions(questionsData);
      setSelections(new Array(questionsData.length).fill(null).map(() => []));
    } else {
      console.error("퀴즈 데이터를 찾을 수 없습니다.")
    }
  }, []);

  const choose = (e, index) => {
    const selectedIndex = parseInt(e.target.value);
    const updatedSelections = [...selections];
    updatedSelections[index] = selectedIndex;
    console.log(updatedSelections);
    setSelections(updatedSelections);
  };

  const displayNext = () => {
    setQuestionCounter(nextCounter => nextCounter + 1);
  };

  const displayPrev = () => {
    setQuestionCounter(prevCounter => prevCounter - 1);
  };

  const displayStartOver = () => {
    setQuestionCounter(0);
    setShowResults(false);
  };

  const displayScore = () => {
    let numCorrect = 0;
    selections.forEach((selected, index) => {
      if (selected === questions[index].correctAnswer) {
        numCorrect++;
      }
    });
    return (
      <div>
        <p>총 {questions.length} 문제 중 {numCorrect} 문제를 맞추셨습니다!</p>
        <div className="button" onClick={displayStartOver} id="start" >처음부터 다시 시작</div>
      </div>
    );
  };

  const createQuestionElements = () => {
    const elements = [];
    const startIndex = questionCounter * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    for (let i = startIndex; i < endIndex && i < questions.length; i++) {
      elements.push(
        <div className="quizWrap" key={i}>
          <h2>질문 {i + 1}</h2>
          <p>{questions[i].question}</p>
          <ul>
            {questions[i].choices.map((choice, choiceIndex) => (
              <li key={choiceIndex}>
                <input
                  type="radio"
                  name={`answer${i}`}
                  value={choiceIndex}
                  onChange={(e) => choose(e, i)}
                  checked={selections[i] === choiceIndex}
                />
                {choice}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return elements;
  };

  const handleSubmitQuiz = () => {
    if (selections.every(selection => selection !== null)) {
      setShowResults(true);
    } else {
      alert("모든 문제에 답을 선택하세요!");
    }
  };

  const handleChangeQuestionsPerPage = (num) => {
    setQuestionsPerPage(num);
    const newCounter = Math.floor(questionCounter * questionsPerPage / num);
    setQuestionCounter(newCounter);
  };

  const isSubmitButtonVisible = !selections.some(selection => selection === null);

  return (
    <div id="container">
      <div id="quiz">
        {questions.length > 0 ? (
          showResults ? (
            displayScore()
          ) : (
            createQuestionElements()
          )
        ) : (
          <p>로딩 중....</p>
        )}
      </div>
      {!showResults && (
        <>
          <div className="button" onClick={displayPrev} id="prev" style={{ display: questionCounter === 0 ? "none" : "inline-block" }}>이전</div>
          <div className="button" onClick={displayNext} id="next">다음</div>
          <div className="button" onClick={() => handleChangeQuestionsPerPage(1)}>1개 보기</div>
          <div className="button" onClick={() => handleChangeQuestionsPerPage(5)}>5개 보기</div>
          <div className="button" onClick={() => handleChangeQuestionsPerPage(10)}>10개 보기</div>
          {isSubmitButtonVisible && <button onClick={handleSubmitQuiz} style={{ display: questionCounter === 0 ? "none" : "inline-block" }}>결과 보기</button>}
          <div>여기는 퀴즈4</div>
        </>
      )}
    </div>
  )
}

export default Quiz4;