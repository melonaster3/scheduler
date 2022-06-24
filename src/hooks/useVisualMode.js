import { useState } from "react";

// For all the visual functions and hooks
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //Transition will move the value to the mode (used for Appointments )
  function transition(value, replace = false) {
    let newHistory = [...history];
    if (replace === true) {
      newHistory.pop();
      newHistory.push(value);
      setHistory(newHistory);
      setMode(value);
    } else {
      setMode(value);
      newHistory.push(value);
      setHistory(newHistory);
    }
  }

  // Back will make the mode to delete history and go back to the mode before (used for Appointments )
  function back() { 
    let newHistory = [...history];
    if (mode !== initial) {
      newHistory.pop();
      setHistory(newHistory);
      let length = newHistory.length - 1;
      setMode(history[length]);
    }
  }

  return { mode, transition, back };
}