import { DateTime } from "luxon"

const dates = (start, end) => {
    var startDate = DateTime.fromISO(start);
    var endDate = DateTime.fromISO(end);
    var dates = [];
    endDate.minus({month: 1});

    var month = DateTime.fromISO(startDate);
    console.log("to this point");
    while( !month.hasSame(endDate, "month")) {
      month.plus({month: 1});
       dates.push(month.toFormat('MMMM'));
    }
    console.log(dates);
    return dates;
}

export default dates;
