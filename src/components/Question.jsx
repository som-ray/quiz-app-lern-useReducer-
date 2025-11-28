import React from "react";

export default function Question({ questionData }) {
  return (
    <div>
      <h4>{questionData.question}</h4>
      {QuestionList({ questionData })}
    </div>
  );
}

function QuestionList({ questionData }) {
  return (
    <div className="options">
      {questionData.options.map((op) => (
        <button className="btn btn-option">{op}</button>
      ))}
    </div>
  );
}
