import { useState } from "react";
import DateCounter from "./components/DateCounter";

import Main from "./components/Main";
import Header from "./components/Header";

import "./App.css";

function App() {
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
