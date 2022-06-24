import { useState, useEffect } from "react";
import axios from "axios";
// This is where all the application data is stored for the application render 
export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

// This is to get all the data from our 8001 api server. 
  useEffect(() => {
    const daysURL = "/api/days";
    const appointmentURL = "/api/appointments";
    const interviewersURL = "/api/interviewers";

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentURL),
      axios.get(interviewersURL),
    ]).then((ans) => {
      setState({
        ...state,
        days: ans[0].data,
        appointments: ans[1].data,
        interviewers: ans[2].data,
      });
    });
  }, []);// eslint-disable-next-line


  // Called when a user books the interview. It will save on online db using axios
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview: interview })
      .then((res) => {
        const days = updateSpots(id, state, false);
        setState({
          ...state,
          days,
          appointments,
        });
      });
  }
  // Called when a user cancels the interview. It will cancel on online db using axios

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      const days = updateSpots(id, state, true);
      setState({
        ...state,
        days,
        appointments,
      });
    });
  }

   // Called when a user edits the interview. It will save on online db using axios
   function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview: interview })
      .then((res) => {
        const days = notUpdateSpots(id, state);
        setState({
          ...state,
          days,
          appointments,
        });
      });
  }

// Called when a user cancels OR books an interview. It will update how many spots are reamining for interview on the day. 
  function updateSpots(id, state, isPlus) {
    const newDays = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        const newSpots = isPlus ? day.spots + 1 : day.spots - 1;
        return { ...day, spots: newSpots };
      }
      return day;
    });
    return newDays;
  }

  // Called when a user cedits interview. It will NOT update how many spots are reamining for interview on the day. 
  function notUpdateSpots(id, state) {
    const newDays = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        return { ...day };
      }
      return day;
    });
    return newDays;
  }


  const setDay = (day) => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview, editInterview };
}
