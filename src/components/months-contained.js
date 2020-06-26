import React, {useState, useEffect} from "react"
import Luxon, { DateTime } from "luxon"

const monthsContained = (start, end) => {
  var endDate = DateTime.fromISO(end);
  var interim = DateTime.fromISO(start);
  var timeValues = [];
  while (endDate > interim || interim.toFormat('M') === endDate.toFormat('M')) {
    timeValues.push({month: interim.toFormat('MMMM'), year: interim.toFormat('yyyy')});
     interim = interim.plus({ month: 1 });
  }
  return timeValues;
}

export default monthsContained;
