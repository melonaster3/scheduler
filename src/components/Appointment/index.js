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

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() =>  transition(SHOW))
      .catch(error=> transition(ERROR_SAVE, true));
  }

  function cancelAppointment(id) {
    transition(SAVING, true);
    props
      .cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => transition(ERROR_DELETE, true));
  }


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
          onCancel={() => back()}
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
          onCancel={() => back()}
          onSave={save}
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          message={`Are you sure you would like to delete this appointment?`}
          onCancel={() => back()}
          id={props.id}
          onConfirm={cancelAppointment}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message={`Could not cancel appointment`}
          onClose={() => back()}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message={`Could not save appointment`}
          onClose={() => back()}
        />
      )}

    </article>
  );
}
