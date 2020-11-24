import { Interval } from "luxon"

const dailyMealTemplate = (departureDate, returnDate) => {
    let dates = Interval.fromDateTimes(
        departureDate.startOf("day"), 
        returnDate.endOf("day"))
        .splitBy({days: 1}).map(d => d.start)
    let travelDays = {}
    dates.forEach((date) => {
        date = date.toISODate();
        travelDays[date] = {
            breakfast: true,
            lunch: true,
            dinner: true,
            incidentals: true,
        }
    })
    return travelDays
}

export { dailyMealTemplate } 