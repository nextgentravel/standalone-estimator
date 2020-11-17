import React, {useState, useEffect} from "react"
import { DateTime } from "luxon"
import mealAllowances from "../data/meals"

const calculateMeals = (mealsByDay, province) => {
    let provinceAllowances = Object.keys(mealAllowances);

    let estimatesForProvince = {};

    let mealsTotal = 0;

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

    for (let [date, mealsSelected] of Object.entries(mealsByDay)) {
        mealsSelected.breakfast ? (mealsTotal = mealsTotal + breakfast) : mealsTotal = mealsTotal
        mealsSelected.lunch ? (mealsTotal = mealsTotal + lunch) : mealsTotal = mealsTotal
        mealsSelected.dinner ? (mealsTotal = mealsTotal + dinner) : mealsTotal = mealsTotal
        mealsSelected.incidentals ? (mealsTotal = mealsTotal + incidentals) : mealsTotal = mealsTotal
    }

    let result = {
        breakfast,
        lunch,
        dinner,
        incidentals,
        dailyTotal,
        total: mealsTotal,
    }
    
    return result;
}

export default calculateMeals;