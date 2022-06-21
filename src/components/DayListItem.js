import React from "react";

import classNames from "classnames";
import "components/DayListItem.scss";

function formatSpots (propSpots) {
    if (propSpots === 1) {
        return `1 spot remaining`
    }

    if (propSpots > 1) {
        return `${propSpots} spots remaining`
    } else {
        return 'no spots remaining'
    }
}
export default function DayListItem (props) {

    const dayListClass = classNames("day-list__item",{
        "day-list__item--selected": props.selected,
        "day-list__item--full": !props.spots  
      });

    return (
        <li onClick={() => props.setDay(props.name)} className = {dayListClass} selected={props.selected}>       
             <h2 className = "text--regular">{props.name}</h2>
            <h3 className = "text--light">{formatSpots(props.spots)}</h3>
        </li>
    );
}