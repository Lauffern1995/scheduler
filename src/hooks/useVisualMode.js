import { useState } from "react";

// UPDATES WHAT COMPONENTS TO SHOW //

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Helper func to transition to which components to display
  function transition (mode, replace = false) {

    if (!replace){
      setMode(mode)
      setHistory((prev) => [...prev, mode])
    }
    else {
      setMode(mode)
      setHistory((prev) => [...prev])
    }
  }

  // removes last position of history array to revert to previous state   
  function back () {
    
   
    if (history.length > 1) {
      history.pop()
      setMode(history[history.length - 1])
    }
    
  }

  return { mode, transition, back };
}

