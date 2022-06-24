import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

// Render the Form component when book appointment button is clicked on 
export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function reset() {
    setStudent("");
    setInterviewer(null);
  }
  // resets and cancels when cancel is clicked
  function cancel() {
    reset();
    props.onCancel();
  }
  // Validates that students name has to be filled
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if(interviewer === null) {
      setError("Interviewer cannot be blank");
      return;
    }

    setError("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={student}
            data-testid="student-name-input"
            placeholder="Enter Student Name"
            onChange={(e) => {
              setStudent(e.target.value);
            }}
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
