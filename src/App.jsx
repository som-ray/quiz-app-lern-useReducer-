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

    default:
      throw new Error("Not valid Type");
  }
};

function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
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
      <Header />
      <Main className="main">
        {status === "loading" && <Loder />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && <Question questionData={questions[index]} />}
      </Main>
    </div>
  );
}

export default App;
