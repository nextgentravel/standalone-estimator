import React, {useState, useEffect} from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FormattedMessage } from 'react-intl';

const MealsModal = (props) => {
    let keys = Object.keys(props.mealsByDay);

    let mealCost = props.mealCost

    let items = keys.map((key) => {
        return {
            meals: props.mealsByDay[key],
            date: key,
        }
    })

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
                <h5 className="modal-title">De-select any meals that will be provided during your trip</h5>
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
                                    Breakfast <small>${mealCost.breakfast}</small>
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
                                    Lunch <small>${mealCost.lunch}</small>
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
                                    Dinner <small>${mealCost.dinner}</small>
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
                                    Incidental <small>${mealCost.incidentals}</small>
                                </label>
                            </div>
                        </div>
                    )
                })}
            </Modal.Body>
            <Modal.Footer>
                <div className="mb-2 mr-3">${mealCost.total}</div>
                <button type="button" className="btn btn-primary" onClick={() => { props.onHide() }}>Done</button>
            </Modal.Footer>
      </Modal>
    )
}

export default MealsModal;
