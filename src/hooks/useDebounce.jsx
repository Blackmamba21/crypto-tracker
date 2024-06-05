import { useEffect, useRef } from "react";

// Custom hook for debounce
function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);

  const debouncedCallback = (...args) => {
    console.log("args", ...args);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  // Clean up the timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay]);

  return debouncedCallback;
}

export default useDebounce;
