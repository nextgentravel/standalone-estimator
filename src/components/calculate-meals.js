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

    for (let [mealsSelected] of Object.entries(mealsByDay)) {
        mealsByDay[mealsSelected].breakfast ? (mealsTotal = mealsTotal + breakfast) : mealsTotal = mealsTotal + 0
        mealsByDay[mealsSelected].lunch ? (mealsTotal = mealsTotal + lunch) : mealsTotal = mealsTotal + 0
        mealsByDay[mealsSelected].dinner ? (mealsTotal = mealsTotal + dinner) : mealsTotal = mealsTotal + 0
        mealsByDay[mealsSelected].incidentals ? (mealsTotal = mealsTotal + incidentals) : mealsTotal = mealsTotal + 0
    }

    let result = {
        breakfast,
        lunch,
        dinner,
        incidentals,
        dailyTotal,
        total: mealsTotal.toFixed(2),
    }

    return result;
}

export default calculateMeals;