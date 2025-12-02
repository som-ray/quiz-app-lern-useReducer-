import React from "react";

export default function Question({ questionData, answer, dispatch }) {
  return (
    <div>
      <h4>{questionData.question}</h4>
      {QuestionList({ questionData, answer, dispatch })}
    </div>
  );
}

function QuestionList({ questionData, answer, dispatch }) {
  const hasAnswered = answer !== null;
  console.log(questionData)
  return (
    <div className="options">
      {questionData.options.map((op, index) => (
        <button
          className={`btn btn-option 
            ${index === answer ? `answer` : ""}
            
            ${
              hasAnswered
                ? index === questionData.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }
            `}
          key={op}
          onClick={() =>
            dispatch({
              type: "newIndex",
              payload: index,
            })
          }
          disabled={hasAnswered}
        >
          {op}
        </button>
      ))}
    </div>
  );
}
