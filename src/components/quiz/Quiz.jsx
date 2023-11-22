import React, { useState } from "react";
import { resultInialState } from "../../assets/Data";
import "./quiz.scss";

export const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [choice, setChoice] = useState(null);
  const [result, setResult] = useState(resultInialState);
  const [showResult, setShowResult] = useState(false);

  const { question, choices, correctAnswer } = questions[currentQuestion];
  // Thay đổi câu trả lời
  const onAnwswerClick = (choice, index) => {
    setAnswerIdx(index);
    if (choice === correctAnswer) {
      setChoice(true);
    } else {
      setChoice(false);
    }
  };
  const onClickNext = () => {
    setAnswerIdx(null);
    setResult((prev) =>
      choice
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };

  const onTryAgain = () => {
    setResult(resultInialState);
    setShowResult(false);
  };
  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
           
          <span className="active-question-no">{currentQuestion + 1}</span>
          <span className="active-question">/{questions.length}</span>
          {/* Câu hỏi */}
          <h2>{question}</h2>
          {/* Các lựa chọn */}
          <ul>
            {choices.map((choice, index) => (
              <li
                onClick={() => onAnwswerClick(choice, index)}
                key={choice}
                className={answerIdx == index ? "selected-choice" : null}
              >
                {choice}
              </li>
            ))}
          </ul>
          <div className="footer">
            <button onClick={onClickNext} disabled={answerIdx === null}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Questions: <span>{questions.length}</span>
          </p>
          <p>
            Total Score: <span>{result.score}</span>
          </p>
          <p>
            Correct Answers: <span>{result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers: <span>{result.wrongAnswers}</span>
          </p>
          <button onClick={onTryAgain}>Try again</button>
        </div>
      )}
    </div>
  );
};
