import { useEffect, useState } from "react";

import "./App.css";
import useDebounce from "./hooks/useDebounce";
function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", debouncedHandleChange);

    return () => {
      window.removeEventListener("resize", debouncedHandleChange);
    };
  }, []);

  const debouncedHandleChange = useDebounce(handleResize, 2000);

  return (
    <>
      <h1>Checkout</h1>
      <p>Window Size: {`${windowSize.width}   X  ${windowSize.height}`}</p>
    </>
  );
}

export default App;
