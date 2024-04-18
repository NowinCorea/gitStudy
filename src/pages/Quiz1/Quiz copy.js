
import React, { useState, useEffect } from 'react';
import './css/Quiz.css';
import questionsData from "./questions.json";

function Quiz() {
  const [questionCounter, setQuestionCounter] = useState(0);
  const [selections, setSelections] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionsPerPage, setQuestionsPerPage] = useState(5); // 추가

  useEffect(() => {
    if (questionsData && questionsData.length > 0) {
      setQuestions(questionsData);
      // 각 문제마다 선택지를 저장하는 배열 초기화
      setSelections(new Array(questionsData.length).fill(null).map(() => []));
    } else {
      console.error("퀴즈 데이터를 찾을 수 없습니다.")
    }
  }, []);

  const choose = (e, index) => {
    const selectedIndex = parseInt(e.target.value);
    const updatedSelections = [...selections];
    console.log(updatedSelections);
    // 선택한 답안을 현재 보고 있는 문제의 선택지 배열에 저장
    updatedSelections[index] = selectedIndex;
    setSelections(updatedSelections);
  };

  const displayNext = () => {
    setQuestionCounter(nextCounter=> nextCounter+ 1)
  }

  const displayPrev = () => {
    setQuestionCounter(prevCounter => prevCounter - 1);
  }

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
        <div className="button" onClick={displayStartOver} id="start" style={{ display: questionCounter === 0 ? "none" : "inline-block" }}>처음부터 다시 시작</div>
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
    // 모든 문제에 답안이 선택되었는지 확인
    if (selections.every(selection => selection !== null)) {
      setShowResults(true);
    } else {
      alert("모든 문제에 답을 선택하세요!");
    }
  };

  const handleChangeQuestionsPerPage = (num) => {
    setQuestionsPerPage(num);
    // 페이지 변경 시 현재 페이지 유지
    const newCounter = Math.floor(questionCounter * questionsPerPage / num);
    setQuestionCounter(newCounter);
  };

  const isSubmitButtonDisabled = !selections.every(selection => selection !== null);

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
          <div className="button" onClick={() => handleChangeQuestionsPerPage(1)}>1개 보기</div> {/* 추가 */}
          <div className="button" onClick={() => handleChangeQuestionsPerPage(5)}>5개 보기</div> {/* 추가 */}
          <div className="button" onClick={() => handleChangeQuestionsPerPage(10)}>10개 보기</div> {/* 추가 */}
          <button onClick={handleSubmitQuiz} disabled={isSubmitButtonDisabled}>결과보기</button> {/* 수정 */}
        </>
      )}
    </div>
  )
}

export default Quiz;