import React from "react";
import DayListItem from "components/DayListItem.js";
// Render the list of the day list items
export default function DayList(props) {
  const dayLists = props.days.map((days) => {
    return (
      <DayListItem
        key={days.id}
        name={days.name}
        spots={days.spots}
        selected={days.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{dayLists}</ul>;
}
