import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";
// render each of the interviewer item
export default function InterviewerListItem(props) {
  // For the css to change color when interivewer is selected
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li onClick={props.setInterviewer} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && <h3>{props.name}</h3>}
    </li>
  );
}
