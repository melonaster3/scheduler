import React from "react";
import "components/Appointment/style.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";

// Render the entire appointment section 
export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";
  
  //When save is clicked, the function will save the appointment to the db
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }
  //When cancelAppointment is clicked, the function will cancel the appointment in the db
  function cancelAppointment(id) {
    transition(SAVING, true);
    props
      .cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => transition(ERROR_DELETE, true));
  }
   //When edit is clicked, the function will edit the appointment to the db
   function edit(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .editInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }
//hooks to change mode 
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {
            transition(CONFIRM);
          }}
          onEdit={() => {
            transition(EDIT);
          }}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={
            props.interview.interviewer ? props.interview.interviewer.id : null
          }
          interviewers={props.interviewers}
          onCancel={back}
          onSave={edit}
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          message={`Are you sure you would like to delete this appointment?`}
          onCancel={back}
          id={props.id}
          onConfirm={cancelAppointment}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message={`Could not cancel appointment`}
          onClose={back}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error message={`Could not save appointment`} onClose={back} />
      )}
    </article>
  );
}
