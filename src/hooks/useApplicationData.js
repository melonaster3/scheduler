import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

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
        const days = updateSpots(id, state, false)
        setState({
          ...state,
          days,
          appointments,
        });
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) => {
        const days = updateSpots(id, state, true)
        setState({
          ...state,
            days,
          appointments,
        });
      })
  }

function updateSpots (id, state, isPlus) {
    const newDays = state.days.map (day => {
        if (day.appointments.includes(id)) {
            const newSpots = isPlus ? day.spots + 1 : day.spots - 1;
                return {...day, spots : newSpots};   
        } 
        return day; 
    })
    return newDays;
}

  useEffect(() => {
    const daysURL = "http://localhost:8001/api/days";
    const appointmentURL = "http://localhost:8001/api/appointments";
    const interviewersURL = "http://localhost:8001/api/interviewers";

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
  }, []);

  const setDay = (day) => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview };
}
