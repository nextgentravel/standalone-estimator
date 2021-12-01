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
                <h5 className="modal-title">{props.messages.meals_modal_title}</h5>
            </Modal.Header>
            <Modal.Body>
                {items.length > 0 && items.map((day, index) => {
                    return (
                        <div className="row mb-3" key={index}>
                            <div className="col-sm"><strong>{day.date}</strong></div>
                            <div className="col-sm">
                                <input
                                    type="checkbox"
                                    name={`${day.date}_breakfast`}
                                    className="form-check-input"
                                    checked={day.meals.breakfast}
                                    onChange={handleChange}
                                />
                                <label>
                                    {props.messages.meals_modal_breakfast} <small>{mealCost.breakfast && localCurrencyDisplay(mealCost.breakfast)}</small>
                                </label>
                            </div>
                            <div className="col-sm">
                                <input
                                    type="checkbox"
                                    name={`${day.date}_lunch`}
                                    className="form-check-input"
                                    checked={day.meals.lunch}
                                    onChange={handleChange}
                                />
                                <label>
                                    {props.messages.meals_modal_lunch} <small>{mealCost.lunch && localCurrencyDisplay(mealCost.lunch)}</small>
                                </label>
                            </div>
                            <div className="col-sm">
                                <input
                                    type="checkbox"
                                    name={`${day.date}_dinner`}
                                    className="form-check-input"
                                    checked={day.meals.dinner}
                                    onChange={handleChange}
                                />
                                <label>
                                    {props.messages.meals_modal_dinner} <small>{mealCost.dinner && localCurrencyDisplay(mealCost.dinner)}</small>
                                </label>
                            </div>
                            <div className="col-sm">
                                <input
                                    type="checkbox"
                                    name={`${day.date}_incidentals`}
                                    className="form-check-input"
                                    checked={day.meals.incidentals}
                                    onChange={handleChange}
                                />
                                <label>
                                    {props.messages.meals_modal_incidental} <small>{mealCost.incidentals && localCurrencyDisplay(mealCost.incidentals)}</small>
                                </label>
                            </div>
                        </div>
                    )
                })}
            </Modal.Body>
            <Modal.Footer>
                <div className="mb-2 mr-3" tabindex='0'>{mealCost.total && localCurrencyDisplay(parseFloat(mealCost.total))}</div>
                <button type="button" className="btn btn-primary" onClick={() => { props.onHide() }}>{props.messages.meals_modal_submit}</button>
            </Modal.Footer>
      </Modal>
    )
}

export default MealsModal;
