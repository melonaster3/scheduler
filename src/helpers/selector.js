export function getAppointmentsForDay(state, day) {
    let appointmentArray = [];

    for (let certainDay of state["days"]) {
        if (certainDay.name === day) {
            appointmentArray = certainDay.appointments;
        }
    } 
    if (appointmentArray.length === 0) {
        return [];
    }

    let returningArray = [];
    let keys = Object.keys(state["appointments"]);

    for (let key of keys) {
        for (let appoint of appointmentArray) {
            if (appoint === state["appointments"][key]["id"]) {
                returningArray.push(state["appointments"][key])
            }
        }
    }
   
    return returningArray; 
  }

export function getInterview (state, interview) {
    if (interview === null) {
        return null; 
    }

    let interviewObject = {
        "student" : interview["student"]
    }
    const interviewerID = interview["interviewer"];

    const interviewer = state["interviewers"][interviewerID];

    interviewObject["interviewer"] = interviewer; 

    return interviewObject; 
  }

  export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(d => d.name === day)
  let interviewers = [];
  if (filteredDay.length === 0) return interviewers;
  for (const id of filteredDay[0].interviewers) {
    interviewers.push(state.interviewers[id]);
  }
  return interviewers;
  }
