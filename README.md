## 📌 useReducer Hook — Easy Explanation (With Example)

useReducer is another way of managing state in React.
Whenever a component has many state values or complex state changes, using multiple useState hooks becomes confusing.
In that situation, useReducer is the best choice because it keeps all state logic in one place.

🔹 Step 1: Import the Hook
import { useReducer } from "react";

🔹 Step 2: Create Initial State

This is the starting state of the component.
It can be an object or array or any data type.

const INITIAL_STATE = { count: 0, step: 1 };

🔹 Step 3: Create Reducer Function

This function contains all the logic for how the state should update.

const reducer = (state, action) => {
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return INITIAL_STATE;
    default:
      throw new Error("Unknown action type");
  }
};


📝 Notes about reducer:

It receives state (current state) and action (what to do)

action.type decides the task

action.payload carries extra data (if needed)

It returns a NEW state — never modifies the old one

🔹 Step 4: Use useReducer inside component
const [state, dispatch] = useReducer(reducer, INITIAL_STATE);


state → gives current values

dispatch → used to trigger reducer and update state

🚀 Full Working Example
import { useReducer } from "react";

const INITIAL_STATE = { count: 0, step: 1 };

const reducer = (state, action) => {
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return INITIAL_STATE;
    default:
      throw new Error("Unknown action type");
  }
};

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { count, step } = state;

  // working with the date
  const date = new Date("June 21 2027");
  date.setDate(date.getDate() + count);

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) =>
            dispatch({ type: "setStep", payload: Number(e.target.value) })
          }
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({ type: "dec" })}>-</button>
        <input
          value={count}
          onChange={(e) =>
            dispatch({ type: "setCount", payload: Number(e.target.value) })
          }
        />
        <button onClick={() => dispatch({ type: "inc" })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}

export default DateCounter;

🤔 When should we use useReducer?

Use it when:

State is complex

Many values depend on each other

Same state changes in different ways

Using useState becomes messy

If state is simple → useState is fine
If state is complex → useReducer is better

🎉 Final Summary

useReducer helps when:

You want clean and organized state management

All state logic should be in one place

The component should be easy to maintain