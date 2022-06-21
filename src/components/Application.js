import React from "react";
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointments from "components/Appointment";
import useApplicationData from "hooks/useApplicationData";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selector";
export default function Application(props) {
  /*const [state, setState] = useState({
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
        setState({
          ...state,
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
        setState({
          ...state,
          appointments,
        });
      })
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

  */

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointments
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{schedule}
      <Appointments
      key = "5pm"
      time = "5pm"/></section>
      
    </main>
  );
}
