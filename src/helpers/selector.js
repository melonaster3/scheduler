// Take the db and the day and return the appointments for the specific day. 
// For example, if day = "Monday", the array of appoinments in monday will be returned 
export function getAppointmentsForDay(state, day) {
  let appointmentArray = [];

  // find the day 
  for (let certainDay of state["days"]) {
    if (certainDay.name === day) {
      appointmentArray = certainDay.appointments;
    }
  }
  if (appointmentArray.length === 0) {
    return [];
  }

  let appointmentsOnTheDay = [];
  let keys = Object.keys(state["appointments"]);

  // push all the appointments
  for (let key of keys) {
    for (let appoint of appointmentArray) {
      if (appoint === state["appointments"][key]["id"]) {
        appointmentsOnTheDay.push(state["appointments"][key]);
      }
    }
  }

  return appointmentsOnTheDay;
}

// Get the specific interview information with only the interview id given 
export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  let interviewObject = {
    student: interview["student"],
  };
  const interviewerID = interview["interviewer"];

  const interviewer = state["interviewers"][interviewerID];

  interviewObject["interviewer"] = interviewer;

  return interviewObject;
}

// Take the db and the day and return the interviewers for the specific day. 
export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter((d) => d.name === day);
  let interviewers = [];
  if (filteredDay.length === 0) {
    return interviewers;
  }
  for (const id of filteredDay[0].interviewers) {
    interviewers.push(state.interviewers[id]);
  }
  return interviewers;
}
