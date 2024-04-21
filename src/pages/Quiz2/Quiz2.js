import React, { useState, useEffect } from 'react';
import './css/Quiz.css';
import {useLocation} from 'react-router';
// import questionsData from "./questions.json";

function Quiz2() {
  const [questionCounter, setQuestionCounter] = useState(0);
  const [selections, setSelections] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionsPerPage, setQuestionsPerPage] = useState(5);
//퀴즈 데이타

const {state} = useLocation();
console.log(state)


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
  return state.quizData.forEach((cols, index, area) => {
    console.log(cols);
    console.log(index);
    // const { id, question: questionText, choice1, choice2, choice3, choice4, correct_choice: correctIndex } = question;
    
    // // Generate radio buttons for choices
    // const choiceElements = [choice1, choice2, choice3, choice4].map((choice, choiceIndex) => (
    //   <li key={choiceIndex}>
    //     <input
    //       type="radio"
    //       name={`answer${index}`}
    //       value={choiceIndex}
    //       onChange={(e) => choose(e, index)}
    //       checked={selections[index] === choiceIndex}
    //     />
    //     {choice}
    //   </li>
    // ));

    // return (
    //   <div className="quizWrap" key={index}>
    //     <h2>질문 {id}</h2>
    //     <p>{questionText}</p>
    //     <ul>{choiceElements}</ul>
    //   </div>
    // );
  });
};
  // const createQuestionElements = () => {
  //   const elements = [];

  //   state.quizData.forEach((v,i,a)=>{
  //     console.log(v);
  //     const correct = v.correct_choice;
  //     //need logic
  //     elements.push(
  //       <div className="quizWrap" key={i}>
  //         <h2>질문 {i + 1}</h2>
  //         <p>{v.question}</p>
  //         <ul>
  //           <li>{v.choice1}</li>
  //           <li>{v.choice2}</li>
  //           <li>{v.choice3}</li>
  //           <li>{v.choice4}</li>
  //         </ul>
  //       </div>
  //     )
  //   })
  //   return elements;
  // };

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
        {state.quizData.length> 0 ? (
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
          {/* <div>{quizData}</div> */}
        </>
      )}
    </div>
  );
}

export default Quiz2;