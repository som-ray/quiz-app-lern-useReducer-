import { useEffect, useReducer } from "react";
import DateCounter from "./components/DateCounter";

import "./App.css";

import Main from "./components/Main";
import Header from "./components/Header";
import Loder from "./components/Loader";
import Error from "./components/Error";
import Question from "./components/Question";
import StartScreen from "./components/StartScreen";

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
      const question = state.questions.at(action.payload);
      console.log(question)
      return {
        ...state, 
        answer: action.payload,
        points: (action.payload === question.correctOption ) ?
                state.points + question.points : state.points
      };

    default:
      throw new Error("Not valid Type");
  }
};

function App() {
  const [{ questions, status, index, answer , points}, dispatch] = useReducer(
    reducer,
    INITIAL_STATE
  );


  const numQuestion = questions.length;
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
      {points}
      <Main className="main">
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
      </Main>
    </div>
  );
}

export default App;
