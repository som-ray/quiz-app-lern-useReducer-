import { useEffect, useReducer } from "react";
import DateCounter from "./components/DateCounter";

import "./App.css";

import Main from "./components/Main";
import Header from "./components/Header";
import Loder from "./components/Loader";
import Error from "./components/Error";
import Question from "./components/Question";
import StartScreen from "./components/StartScreen";
import Progress from "./components/Progress";

const INITIAL_STATE = {
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  status: "loading",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataRecived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFaild":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
      };

    case "newIndex":
      const question = state.questions[(action.payload)];
      console.log("Points:", state.points)
      console.log("question:", question)
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    default:
      throw new Error("Not valid Type");
  }
};

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE
  );

  const numQuestion = questions.length;
  const totalpoints = questions.reduce((prev, curr) => prev + curr.points, 0)

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataRecived", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "dataFaild" });
        console.error(err);
      });
  }, []);
  return (
    <div className="app">
      {/* <Header /> */}

      <Main className="main">
        <Progress numQuestion={numQuestion} totalpoints={totalpoints} index={index} answer={answer} points={points} />
        {status === "loading" && <Loder />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question
            questionData={questions[index]}
            answer={answer}
            dispatch={dispatch}
          />
        )}
        <NextButton dispatch={dispatch} answer={answer} />
      </Main>

    </div>
  );
}


function NextButton({ dispatch, answer }) {
  if (!answer) return null;
  return <button onClick={() => dispatch({ type: "nextQuestion" })} className="btn btn-ui">
    Next
  </button>
}
export default App;
