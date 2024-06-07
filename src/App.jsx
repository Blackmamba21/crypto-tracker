import { useEffect, useState } from "react";
import "./App.css";
import Currencyconverter from "./Currencyconverter";
function App() {
  return (
    <div className="min-h-screen  flex justify-center items-center flex-col ">
      <div className="container">
        <Currencyconverter />
      </div>
    </div>
  );
}

export default App;
