import { useState } from "react";

// For all the visual functions and hooks
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //Transition will move the value to the mode (used for Appointments )
  function transition(value, replace = false) {
    if (replace === true) {
      history.pop();
      history.push(value);
      setHistory(history);
      setMode(value);
    } else {
      setMode(value);
      history.push(value);
      setHistory(history);
    }
  }

  // Back will make the mode to delete history and go back to the mode before (used for Appointments )
  function back() { 
    if (mode !== initial) {
      history.pop();
      setHistory(history);
      let length = history.length - 1;
      setMode(history[length]);
    }
  }

  return { mode, transition, back };
}
