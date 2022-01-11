import React from "react"
import Modal from 'react-bootstrap/Modal'

const MealsModal = (props) => {
    let keys = Object.keys(props.mealsByDay);

    let mealCost = props.mealCost
    let items = keys.map((key) => {
        return {
            meals: props.mealsByDay[key],
            date: key,
        }
    })

    const localCurrencyDisplay = (string) => {
        return string.toLocaleString(props.locale, {minimumFractionDigits: 2, maximumFractionDigits: 2, style: 'currency', currency: 'CAD', currencyDisplay: 'symbol'}).replace('CA', '')
    }

    let handleChange = (e) => {
        let checked = e.target.checked
        let name = e.target.name
        let nameSplit = name.split('_')
        let date = nameSplit[0]
        let meal = nameSplit[1]
        props.setMealsByDay({
            ...props.mealsByDay,
            [date]: {
                ...props.mealsByDay[date],
                [meal]: checked
            }
        })
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
            onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2 className="h3">{props.messages.meals_and_incidentals}</h2>
                    <p className="h5">{props.messages.meals_modal_title}</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {items.length > 0 && items.map((day, index) => {
                    return (
                        <div className="row mb-3" key={index}>
                            <fieldset className="meals-fieldset row mb-3" id={`meals-fieldset-${day.date}`} >
                                <legend className="sr-only">{day.date}</legend>
                                <div className="col-lg">
                                    <strong>{day.date}</strong>
                                </div>
                                <div className="col-lg ml-4 ml-lg-0">
                                    <input
                                        type="checkbox"
                                        name={`${day.date}_breakfast`}
                                        id={`${day.date}_breakfast`}
                                        className="form-check-input"
                                        checked={day.meals.breakfast}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={`${day.date}_breakfast`}>
                                        {props.messages.meals_modal_breakfast} <small>{mealCost.breakfast && localCurrencyDisplay(mealCost.breakfast)}</small>
                                    </label>
                                </div>
                                <div className="col-lg ml-4 ml-lg-0">
                                    <input
                                        type="checkbox"
                                        name={`${day.date}_lunch`}
                                        id={`${day.date}_lunch`}
                                        className="form-check-input"
                                        checked={day.meals.lunch}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={`${day.date}_lunch`}>
                                        {props.messages.meals_modal_lunch} <small>{mealCost.lunch && localCurrencyDisplay(mealCost.lunch)}</small>
                                    </label>
                                </div>
                                <div className="col-lg ml-4 ml-lg-0">
                                    <input
                                        type="checkbox"
                                        name={`${day.date}_dinner`}
                                        id={`${day.date}_dinner`}
                                        className="form-check-input"
                                        checked={day.meals.dinner}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={`${day.date}_dinner`}>
                                        {props.messages.meals_modal_dinner} <small>{mealCost.dinner && localCurrencyDisplay(mealCost.dinner)}</small>
                                    </label>
                                </div>
                                <div className="col-lg ml-4 ml-lg-0">
                                    <input
                                        type="checkbox"
                                        name={`${day.date}_incidentals`}
                                        id={`${day.date}_incidentals`}
                                        className="form-check-input"
                                        checked={day.meals.incidentals}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={`${day.date}_incidentals`}>
                                        {props.messages.meals_modal_incidental} <small>{mealCost.incidentals && localCurrencyDisplay(mealCost.incidentals)}</small>
                                    </label>
                                </div>
                            </fieldset>
                        </div>
                    )
                })}
            </Modal.Body>
            <Modal.Footer>
                <div className="mb-2 mr-3" tabindex='0'><strong >{props.messages.meals_and_incidentals_total}: </strong>{mealCost.total && localCurrencyDisplay(parseFloat(mealCost.total))}</div>
                <button type="button" className="btn btn-primary" onClick={() => { props.onHide() }}>{props.messages.meals_modal_submit}</button>
            </Modal.Footer>
      </Modal>
    )
}

export default MealsModal;
