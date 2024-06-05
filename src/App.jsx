import { useEffect, useState } from "react";

import "./App.css";
import useCounterStore from "./store";
function App() {
  const { count, increment, decrement, incrementAsync } = useCounterStore();
  return (
    <>
      <h1>Zustand</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
        <button onClick={increment}>Increment</button>
        <p>{count}</p>
        <button onClick={decrement}>Decrement</button>
        <button onClick={incrementAsync}>Increment Async</button>
      </div>
    </>
  );
}

export default App;
