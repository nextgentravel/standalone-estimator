import React, {useState, useEffect} from "react"
import Luxon, { DateTime } from "luxon"

const dates = (start, end) => {
    var startDate = DateTime(start);
    var endDate = DateTime(end);
    var dates = [];
    endDate.subtract(1, "month");

    var month = DateTime(startDate);
    while( month < endDate ) {
      month.setMonth(month.getMonth() + 1);
       dates.push(month.format('DD-MM-YYYY'));
    }

    return dates;
}

export default dates;
