import { useEffect, useReducer } from "react";
import DateCounter from "./components/DateCounter";

import Main from "./components/Main";
import Header from "./components/Header";

import "./App.css";

const INITIAL_STATE = {
  question: [],
  status: "loading"
}
const reducer = (state, action) => {
  switch (action.type) {
    case "dataRecived":
      return {
        ...state,
        question: action.payload,
        status: "ready"
      }

    case "dataFaild":
      return {
        ...state,
        status: "error"
      }

    default: throw new Error("Not valid Type")
  }
}



function App() {

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataLoad", payload: data })
        console.log(data)
      })
      .catch((err) => {
        dispatch({ type: "dataFaild" })
        console.error(err)
      })
  }, [])
  return (
    <div className="app">
      {/* Uncommnet the DateCounter for learning the frist part */}
      {/* <DateCounter /> */}
      <Header />
      <Main className="main">
        <p>1/15</p>
        <>Question App</>
      </Main>

    </div>
  );
}

export default App;
