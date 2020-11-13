import React, {useState, useEffect} from "react"
import { DateTime } from "luxon"
import mealAllowances from "../data/meals"

const calculateMeals = (departDate, returnDate, province) => {
    let departD = DateTime.fromISO(departDate);
    let returnD = DateTime.fromISO(returnDate);
    
    let duration = returnD.diff(departD, 'days')
    let provinceAllowances = Object.keys(mealAllowances);

    let estimatesForProvince = {};

    if (provinceAllowances.includes(province)) {
        estimatesForProvince = mealAllowances[province];
    } else {
        estimatesForProvince = mealAllowances['CAN'];
    };

    let breakfast = estimatesForProvince.breakfast;
    let lunch = estimatesForProvince.lunch;
    let dinner = estimatesForProvince.dinner;
    let incidentals = estimatesForProvince.incidentals;
    let dailyTotal = breakfast + lunch + dinner + incidentals;
    let total = dailyTotal * duration.values.days;

    return {
        dailyTotal,
        total,
        breakfast,
        lunch,
        dinner,
        incidentals,
    }
}

export default calculateMeals;