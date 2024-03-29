import React, { useState, useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import InputDatalist from "./input-datalist.js"
import calculateMeals from "./calculate-meals.js"
import { DateTime, Interval } from "luxon"
import * as yup from "yup"
import { useIntl } from "react-intl"
import EstimatorRow from "./estimator-row.js"
import EmailModal from "./email-modal.js"
import EmailConfirmationModal from "./email-confirmation-modal.js"
import MealsModal from "./meals-modal.js"
import FlightModal from "./flight-modal.js"
import QuickReferenceCard from "./quick-reference-card.js"

import {
  FaCaretUp,
  FaCaretDown,
  FaCalculator,
  FaPlusCircle,
  FaMinusCircle,
} from "react-icons/fa"
import { dailyMealTemplate } from "./functions/dailyMealTemplate"

import "unorm"

import Tooltip from "react-bootstrap/Tooltip"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"

import cities from "../data/cities.js"
import geocodedCities from "../data/geocodedCities"
import locations from "../data/locations.js"

import {
  FaSpinner,
  FaQuestionCircle,
  FaExclamationTriangle,
  FaBed,
  FaPlane,
  FaTaxi,
  FaUtensils,
  FaSuitcase,
} from "react-icons/fa"

import amadeusFlightOffer from "../api-calls/amadeusFlightOffer"
import fetchDistanceBetweenPlaces from "../api-calls/fetchDistanceBetweenPlaces"

import "./extra/estimator-print.css"
import EmailErrorModal from "./email-error-modal.js"

let initialDeparture = ""
let initialReturn = ""

const ConditionalWrap = ({ condition, wrap, children }) =>
  condition ? wrap(children) : children

if (typeof String.prototype.replaceAll === "undefined") {
  String.prototype.replaceAll = function (match, replace) {
    return this.replace(new RegExp(match, "g"), () => replace)
  }
}

const Estimator = () => {
  const intl = useIntl()
  const summaryView = useRef(null)
  const errorPanelView = useRef(null)
  const emailErrorPanelView = useRef(null)
  const flightSelectRef = useRef(null)

  const executeSummaryViewScroll = () => summaryView.current.scrollIntoView()
  const executeErrorPanelViewScroll = () =>
    errorPanelView.current.focus() && errorPanelView.current.scrollIntoView()
  const executeEmailErrorPanelViewScroll = () =>
    emailErrorPanelView.current.focus() &&
    emailErrorPanelView.current.scrollIntoView()

  const accommodationSelect = useRef(null)
  const focusAccommodationSelect = () => {
    setTimeout(() => {
      accommodationSelect.current.focus()
    }, 4000)
  }

  const today = DateTime.now().toISODate()
  const twentyYearsFromToday = DateTime.now().plus({ years: 20 }).toISODate()

  let locale = `${intl.locale}-ca`

  const localCurrencyDisplay = string => {
    const float = parseFloat(string)
    let localDisplay = float
      .toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: "currency",
        currency: "CAD",
        currencyDisplay: "symbol",
      })
      .replace("CA", "")
      .replace(/\D00(?=\D*$)/, "")
    return localDisplay
  }

  const cmsData = useStaticQuery(graphql`
    query cmsData {
      allPrismicStandaloneestimatorCopy {
        nodes {
          lang
          data {
            disclaimer_body {
              html
            }
            enter_travel_info_above
            explainer_body {
              html
            }
            explainer_title {
              text
            }
            lead {
              html
            }
            title {
              text
            }
            flight_below_estimate {
              html
            }
            flight_error {
              html
            }
            flight_loading {
              html
            }
            flight_success {
              html
            }
            flight_no_results {
              html
            }
            flight_no_results_custom {
              html
            }
            flight_zero {
              html
              text
            }
            hotel_above_estimate {
              html
            }
            hotel_below_estimate {
              html
            }
            hotel_error {
              html
            }
            hotel_success {
              html
            }
            hotel_zero {
              html
            }
            local_tranportation_zero {
              html
            }
            local_transportation_manual {
              html
            }
            local_transportation_success {
              html
            }
            private_accom_estimate_success {
              html
            }
            private_accom_estimate_zero {
              html
            }
            private_vehicle_above_estimate {
              html
            }
            private_vehicle_below_estimate {
              html
            }
            private_vehicle_error {
              html
            }
            private_vehicle_manual {
              html
            }
            private_vehicle_success {
              html
            }
            rental_car_error {
              html
            }
            rental_car_success {
              html
            }
            rental_car_zero {
              html
            }
            return_date_earlier_than_departure_date {
              html
            }
            train_above_estimate {
              html
            }
            train_below_estimate {
              html
            }
            train_error {
              html
            }
            train_success {
              html
            }
            train_zero {
              html
            }
            new_tab_message
            other_tooltip_text
            estimate_destination
            estimate
            clear
            estimate_summary_title
            accommodation
            hotel
            private
            transportation
            flight
            train
            rental
            not_required
            local_transportation
            meals_and_incidentals
            other_allowances
            total_cost
            email
            estimate_origin
            disclaimer
            date_picker_label
            screen_reader_input_message
            other_allowances_message
            could_not_fetch_flight_value
            could_not_fetch_you_have_entered_own
            email_confirm_success_title
            email_confirm_error_title
            email_confirm_success_body
            email_confirm_error_body
            email_confirm_back_button
            email_confirm_new_estimate_button
            email_form_trip_name
            email_form_trip_name_placeholder
            email_form_travellers_name
            email_form_travellers_name_placeholder
            email_form_travellers_email
            email_form_travellers_email_placeholder
            email_form_approvers_name
            email_form_approvers_name_placeholder
            email_form_approvers_email
            email_form_approvers_email_placeholder
            email_form_notes
            email_form_notes_placeholder
            email_form_is_public_servant_checkbox_label
            email_form_category_label
            email_form_category_options {
              option_label
              option_value
            }
            email_form_field_required
            email_form_field_invalid
            email_modal_title
            email_modal_submit
            meals_modal_title
            email_form_disclaimer {
              html
            }
            meals_modal_breakfast
            meals_modal_lunch
            meals_modal_dinner
            meals_modal_incidental
            meals_modal_submit
            select_meals_link
            email_confirm_error_title
            accommodation_tooltip
            estimate_error_title
            estimate_error_lead
            estimate_origin_city_not_valid
            estimate_destination_city_not_valid
            flight_message_no_airport {
              html
            }
            private_vehicle
            no_time_travel
            estimate_departure_date_not_valid
            estimate_return_date_not_valid
            transportation_above_flight_estimate {
              html
            }
            date_picker_label
            datepicker_calendar_label
            datepicker_role_description
            datepicker_close
            date_picker_focus_start_date
            datepicker_clear_date
            datepicker_clear_dates
            datepicker_jump_to_prev_month
            datepicker_jump_to_next_month
            datepicker_keyboard_shortcuts
            datepicker_showkeyboard_shortcuts_panel
            datepicker_hide_keyboard_shortcuts_panel
            datepicker_open_this_panel
            datepicker_enter_key
            datepicker_left_arrow_right_arrow
            datepicker_up_arrow_down_arrow
            datepicker_page_up_page_down
            datepicker_home_end
            datepicker_escape
            datepicker_question_mark
            datepicker_select_focused_date
            datepicker_move_focus_by_one_day
            datepicker_move_focus_by_one_week
            datepicker_move_focus_by_one_month
            datepicker_move_focus_to_start_and_end_of_week
            datepicker_return_focus_to_input
            datepicker_keyboard_forward_navigation_instructions
            datepicker_keyboard_backward_navigation_instructions
            datepicker_choose_available_start_date
            datepicker_choose_available_end_date
            datepicker_date_is_unavailable
            datepicker_date_is_selected
            datepicker_date_is_selected_as_start_date
            datepicker_date_is_selected_as_end_date
            datepicker_start_date
            datepicker_end_date
            flight_estimate_your_fare_link
            flight_modal_header
            flight_modal_origin_airport_label
            flight_modal_departure_time_label
            flight_modal_destination_airport_label
            flight_modal_return_time_label
            flight_modal_fetch_flight_estimate_label
            flight_modal_result_header
            flight_modal_label_minimum
            flight_modal_label_maximum
            flight_modal_label_median
            flight_modal_note_disclaimer {
              html
            }
            flight_modal_use_in_estimate_button_label
            flight_modal_close_button_label
            flight_modal_leaving_header
            flight_modal_return_header
            flight_modal_initial_instructions {
              html
            }
            flight_modal_zero_results
            flight_modal_zero_results_with_link {
              html
            }
            flight_modal_api_error
            flight_selected_fare
            flight_selected_fare_preselected
            flight_regenerate_estimate
            select
            private_vehicle_enter_distance_manually
            flight_custom_fare_entered
            transportation_select_message
            accommodation_select_message
            email_field_disabled_message {
              html
            }
            email_error_accom_type
            email_error_accom_value
            email_error_transport_type
            email_error_transport_value
            email_form_trip_name_helptext
            email_form_notes_helptext
            accommodation_type
            transportation_type
            aria_summary_loading
            aria_summary_loaded
            accommodation_total
            transportation_total
            local_transportation_total
            meals_and_incidentals_total
            other_allowances_total
            date_format_description
            aria_flight_estimate_loading
            aria_flight_estimate_loaded
            autocomplete_no_results
            autocomplete_query_too_short
            autocomplete_status_selected_option
            autocomplete_status_no_results
            autocomplete_assistive_hint
            quick_reference_title
            quick_reference_links {
              link_title
              link_url {
                target
                url
              }
            }
            select_meals_description
            nextgen_opener {
              html
            }
            nextgen_opener_show
            simplify_content_show
            simplify_title
            simplify_content {
              html
            }
            autocomplete_help_text
            flight_modal_departure_time_offset_label
            flight_modal_return_time_offset_label
            is_not_valid
            is_required
            email_error_modal_title
            email_error_modal_close_text
            alt_for_fabed
            alt_for_facalculator
            alt_for_facaretdown
            alt_for_facaretup
            alt_for_facheckcircle
            alt_for_faexclamationtriangle
            alt_for_faminuscircle
            alt_for_faplane
            alt_for_fapluscircle
            alt_for_faquestioncircle
            alt_for_faspinner
            alt_for_fasuitcase
            alt_for_fataxi
            alt_for_fautensils
            required
            enable_manual_km_checkbox_label
            manual_km_input_label
            acrd_api_error {
              html
            }
            tab_twice
            tab_once
            manual_private_vehicle
          }
        }
      }
    }
  `)

  let localeCopy = cmsData.allPrismicStandaloneestimatorCopy.nodes.find(
    function (o) {
      return o.lang === locale
    }
  ).data

  function formattedMessage(prismicKey, classes) {
    let messageType = typeof localeCopy[prismicKey]
    let message
    if (messageType === "string") {
      message = localeCopy[prismicKey]
    } else if (messageType === "object" && localeCopy[prismicKey] !== null) {
      message = (
        <div
          className={classes}
          dangerouslySetInnerHTML={{ __html: localeCopy[prismicKey].html }}
        ></div>
      )
    } else {
      message = "MISSING MESSAGE " + prismicKey
    }
    return message
  }

  function newTabLink(html) {
    let message = ""
    message = html.replaceAll(
      "{new_tab_message}",
      `<span class='sr-only'>${localeCopy.new_tab_message}</span>`
    )
    return message
  }

  let initialTransportationMessage = {
    element: <span></span>,
    style: "primary",
  }

  const citiesList = cities.citiesList
  const [filteredCitiesList, setFilteredCitiesList] = useState([])

  const [screenReaderStatus, setScreenReaderStatus] = useState("")

  useEffect(() => {
    setLoading(true)
    let list = []
    for (let city in geocodedCities) {
      let province = geocodedCities[city].acrdName.slice(-2)
      let cityName = geocodedCities[city].acrdName.slice(0, -3)
      let display = `${cityName}, ${province}`
      let description = geocodedCities[city].description ? geocodedCities[city].description : ''

      list.push({
        id: geocodedCities[city].google_place_id,
        label: `${display} ${description}`,
        type: "city",
        searchTerm: `${display} ${description}`,
        acrdName: geocodedCities[city].acrdName,
        provinceCode: province,
        cityName: cityName,
        iataCode:
          geocodedCities[city].airports.length > 0
            ? geocodedCities[city].airports[0].iataCode
            : null,
        cityCode:
          geocodedCities[city].airports.length > 0
            ? geocodedCities[city].airports[0].address.cityCode
            : null,
        airports: geocodedCities[city].airports,
      })
    }
    setFilteredCitiesList(list)
    removeActiveDescendantAttr()
    // updateAccommodationCost(0.00)
    // updateTransportationCost(0.00)
    // updateLocalTransportationCost(0.00)
    // updateMealCost(0.00)
    // updateOtherCost(0.00)
    setLoading(false)
  }, [])

  const removeActiveDescendantAttr = () => {
    const originInput = document.querySelector("#autocomplete-origin")
    originInput && originInput.removeAttribute("aria-activedescendant")
    const destinationInput = document.querySelector("#autocomplete-destination")
    destinationInput &&
      destinationInput.removeAttribute("aria-activedescendant")
  }

  let initialDates = {
    departure: initialDeparture,
    return: initialReturn,
  }

  // Variables/state for inputs
  const [origin, setOrigin] = useState({})
  const [destination, setDestination] = useState({})

  const [departureDate, setDepartureDate] = useState(initialDates.departure)
  const [returnDate, setReturnDate] = useState(initialDates.return)

  const convertToLux = date => {
    return DateTime.fromISO(date)
  }

  const [departureDateLux, setDepartureDateLux] = useState(null)
  const [returnDateLux, setReturnDateLux] = useState(null)

  const [privateVehicleRate, setPrivateVehicleRate] = useState("")
  const [privateVehicleSuccess, setPrivateVehicleSuccess] = useState(false)
  const [showClear, setShowClear] = useState(false)

  // Flight modal vars

  const [originAirportCode, setOriginAirportCode] = useState("")
  const [destinationAirportCode, setDestinationAirportCode] = useState("")
  const [departureTime, setDepartureTime] = useState("07:00")
  const [returnTime, setReturnTime] = useState("17:00")
  const [departureOffset, setDepartureOffset] = useState(2)
  const [returnOffset, setReturnOffset] = useState(2)

  useEffect(() => {
    if (departureDate !== null) {
      setDepartureDateLux(convertToLux(departureDate))
    }
  }, [departureDate])

  useEffect(() => {
    if (returnDate !== null) {
      setReturnDateLux(convertToLux(returnDate))
    }
  }, [returnDate])

  useEffect(() => {
    setResult(false)
    setTransportationEstimates(transportationEstimatesInitialState)
    updateTransportationCost(0.0)
    setTransportationMessage(initialTransportationMessage)
    setEnterKilometricsDistanceManually(false)
    setPrivateVehicleSuccess(false)
    if (
      departureDate !== initialDates.departure ||
      returnDate !== initialDates.return ||
      origin !== "" ||
      destination !== ""
    ) {
      setShowClear(true)
    } else {
      setShowClear(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, destination, departureDate, returnDate])

  useEffect(() => {
    if (Object.keys(origin).length !== 0) {
      let provinceRate = locations[origin.provinceCode].rateCents
      setPrivateVehicleRate(provinceRate)
    }
    setOriginAirportCode(
      origin.airports && origin.airports.length !== 0
        ? origin.airports[0].iataCode
        : ""
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin])

  useEffect(() => {
    setDestinationAirportCode(
      destination.airports && destination.airports.length !== 0
        ? destination.airports[0].iataCode
        : ""
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination])

  const [accommodationType, setAccommodationType] = useState("")
  const [transportationType, setTransportationType] = useState("")

  const [submitValidationWarnings, setSubmitValidationWarnings] = useState([])
  const [emailValidationWarnings, setEmailValidationWarnings] = useState([])
  const [flightValidationWarnings, setFlightValidationWarnings] = useState([])

  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState(false)
  const [generalError, setGeneralError] = useState(false)
  const [errorPanel, setErrorPanel] = useState(false)
  const [emailErrorPanel, setEmailErrorPanel] = useState(false)

  const transportRef = useRef(null)

  const [accommodationCost, setAccommodationCost] = useState("0.00")
  const [acrdTotal, setAcrdTotal] = useState(0.0)
  const [acrdFetchSuccess, setAcrdFetchSuccess] = useState(false)
  const [accommodationMessage, setAccommodationMessage] = useState({
    element: <span></span>,
    style: "primary",
  })
  const [transportationMessage, setTransportationMessage] = useState(
    initialTransportationMessage
  )
  const [localTransportationMessage, setLocalTransportationMessage] = useState({
    element: <span></span>,
    style: "primary",
  })
  const [transportationCost, setTransportationCost] = useState("0.00")
  const [localTransportationCost, setLocalTransportationCost] = useState("0.00")
  const [mealCost, setMealCost] = useState({ total: "0.00" })
  const [otherCost, setOtherCost] = useState("0.00")
  const [summaryCost, setSummaryCost] = useState("0.00")
  const [
    enterKilometricsDistanceManually,
    setEnterKilometricsDistanceManually,
  ] = useState(false)
  const [privateKilometricsValue, setPrivateKilometricsValue] = useState(0)
  const [returnDistance, setReturnDistance] = useState("")

  const [
    localTransportationEstimate,
    setLocalTransportationEstimate,
  ] = useState(0)

  const [mealsByDay, setMealsByDay] = useState({})
  const [province, setProvince] = useState("")
  const [applicableRates, setApplicableRates] = useState([])

  const [emailModalShow, setEmailModalShow] = useState(false)
  // const [emailErrorModalShow, setEmailErrorModalShow] = useState(false);
  const [emailErrorList, setEmailErrorList] = useState([])
  const [emailClicked, setEmailClicked] = useState(false)
  const [emailRequestLoading, setEmailRequestLoading] = useState(false)
  const [emailConfirmationModalShow, setEmailConfirmationModalShow] = useState(
    false
  )
  const [emailRequestResult, setEmailRequestResult] = useState({})

  const [tripName, setTripName] = useState("")
  const [travellersName, setTravellersName] = useState("")
  const [travellersEmail, setTravellersEmail] = useState("")
  const [approversName, setApproversName] = useState("")
  const [approversEmail, setApproversEmail] = useState("")
  const [tripNotes, setTripNotes] = useState("")
  const [travellerIsPublicServant, setTravellerIsPublicServant] = useState(true)
  const [travelCategory, setTravelCategory] = useState("")

  const transportationEstimatesInitialState = {
    flight: {
      estimatedValue: 0,
      responseBody: "",
      estimatedValueMessage: <></>,
    },
    train: {
      estimatedValue: 0,
      responseBody: "",
      estimatedValueMessage: <></>,
    },
    rentalCar: {
      estimatedValue: 0,
      responseBody: "",
      estimatedValueMessage: <></>,
    },
    privateVehicle: {
      estimatedValue: 0,
      responseBody: "",
      estimatedValueMessage: <></>,
    },
  }

  const [transportationEstimates, setTransportationEstimates] = useState(
    transportationEstimatesInitialState
  )

  function displayTransportationMessage() {
    let calculateKilometrics =
      privateKilometricsValue * (privateVehicleRate / 100)
    if (
      privateVehicleSuccess &&
      privateKilometricsValue === (returnDistance / 1000).toFixed(2)
    ) {
      let message = ""
      message = localeCopy.private_vehicle_success.html.replace(
        "{rate}",
        `<strong>${privateVehicleRate}</strong>`
      )
      message = message.replace(
        "{distance}",
        `<strong>${(returnDistance / 1000).toFixed(0)}</strong>`
      )
      setTimeout(() => {
        setTransportationMessage({
          element: (
            <div
              className="transportation-message"
              dangerouslySetInnerHTML={{ __html: message }}
            ></div>
          ),
        })
        setTimeout(() => {
          setScreenReaderStatus(localeCopy.manual_private_vehicle)
        }, 100)
      }, 100)
    } else if (enterKilometricsDistanceManually) {
      let message = ""
      message = localeCopy.private_vehicle_manual.html.replace(
        "{rate}",
        `<strong>${privateVehicleRate}</strong>`
      )
      message = message.replace(
        "{distance}",
        `<strong>${parseInt(privateKilometricsValue)}</strong>`
      )
      setTimeout(() => {
        setTransportationMessage({
          element: (
            <div
              className="transportation-message"
              dangerouslySetInnerHTML={{ __html: message }}
            ></div>
          ),
        })
        setTimeout(() => {
          setScreenReaderStatus(localeCopy.manual_private_vehicle)
        }, 100)
      }, 100)
    } else if (!privateVehicleSuccess) {
      setTimeout(() => {
        setTransportationMessage({
          element: (
            <div
              className="transportation-message alert-warning"
              dangerouslySetInnerHTML={{
                __html: localeCopy.private_vehicle_error.html,
              }}
            ></div>
          ),
        })
        setTimeout(() => {
          setScreenReaderStatus(localeCopy.manual_private_vehicle)
        }, 100)
      }, 100)
    }
    return calculateKilometrics
  }

  useEffect(() => {
    if (result) {
      let calculateKilometrics = displayTransportationMessage()
      setTransportationCost(calculateKilometrics.toFixed(2))
      setTransportationEstimates({
        ...transportationEstimates,
        rentalCar: {
          estimatedValue: calculateKilometrics,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [privateKilometricsValue])

  useEffect(() => {
    calculateTotal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    accommodationCost,
    transportationCost,
    localTransportationCost,
    mealCost,
    otherCost,
  ])

  useEffect(() => {
    let mealTotals = calculateMeals(mealsByDay, province)
    setMealCost(mealTotals)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mealsByDay])

  const [mealsModalShow, setMealsModalShow] = React.useState(false)

  const [flightModalShow, setFlightModalShow] = React.useState(false)

  let handleMealsModalShow = e => {
    e.preventDefault()
    setMealsModalShow(true)
  }

  let handleFlightModalShow = e => {
    e.preventDefault()
    setFlightModalShow(true)
  }

  let [selectedFlightPrice, setSelectedFlightPrice] = useState(0.0)
  let [flightResult, setFlightResult] = useState({})
  let [initialFlightResult, setInitialFlightResult] = useState(1.11)
  let [acceptedFlight, setAcceptedFlight] = useState(0.0)

  const fetchHotelCost = async () => {
    let requestBody = {
      city: destination.cityName,
      province: destination.provinceCode,
      startDate: departureDate,
      endDate: returnDate,
    }
    let response = await fetch("/api/fetchAcrdRates", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    let result

    if (response.status === 200) {
      result = await response.json()
      console.log(result)
      setAcrdTotal(result.total)
      setApplicableRates(result.ratesByDay)
      setAcrdFetchSuccess(true)
    } else {
      setAcrdTotal(0.0)
      setApplicableRates([])
      setAcrdFetchSuccess(false)
    }
  }

  const fetchLocalTransportationRate = numberOfDays => {
    let cost = 100 + 50 * numberOfDays
    setLocalTransportationEstimate(cost)
    updateLocalTransportationCost(cost)
    setLocalTransportationMessage({
      element: (
        <div
          className="transportation-message"
          dangerouslySetInnerHTML={{
            __html: localeCopy.local_transportation_success.html,
          }}
        ></div>
      ),
    })
  }

  useEffect(() => {
    setScreenReaderStatus("")

    if (accommodationType === "hotel") {
      if (acrdFetchSuccess) {
        let province = destination.provinceCode
        let cityName = destination.cityName
        let destinationDisplay = `${cityName}, ${province}`

        let message = localeCopy.hotel_success.html
        message = message.replace(
          "{location}",
          `<strong>${destinationDisplay}</strong>`
        )
        // eslint-disable-next-line no-template-curly-in-string
        message = message.replace(
          "{daily rate}",
          `<strong>${localCurrencyDisplay(
            applicableRates[0].rate.max_rate
          )}</strong>`
        )
        setTimeout(() => {
          setAccommodationMessage({
            element: (
              <span
                className="transportation-message"
                dangerouslySetInnerHTML={{ __html: message }}
              ></span>
            ),
          })
        }, 100)
        if (departureDate === returnDate) {
          updateAccommodationCost(0.0)
        } else {
          updateAccommodationCost(acrdTotal)
        }
      } else {
        setTimeout(() => {
          setAccommodationMessage({
            element: (
              <div
                className="transportation-message alert-warning"
                dangerouslySetInnerHTML={{
                  __html: newTabLink(localeCopy.acrd_api_error.html),
                }}
              ></div>
            ),
          })
          setTimeout(() => {
            setScreenReaderStatus(localeCopy.tab_twice)
          }, 100)
        }, 100)
      }
    } else if (accommodationType === "private") {
      let rate =
        (Interval.fromDateTimes(departureDateLux, returnDateLux).count("days") -
          1) *
        50
      setTimeout(() => {
        setAccommodationMessage({
          element: (
            <div
              className="transportation-message"
              dangerouslySetInnerHTML={{
                __html: localeCopy.private_accom_estimate_success.html,
              }}
            ></div>
          ),
        })
      }, 100)
      updateAccommodationCost(rate)
    } else if (accommodationType === "notrequired") {
      setTimeout(() => {
        setAccommodationMessage({
          element: <span className="transportation-message"></span>,
        })
      }, 100)
      updateAccommodationCost(0.0)
    } else if (result) {
      setTimeout(() => {
        setAccommodationMessage({
          element: (
            <span className="transportation-message">
              {formattedMessage("transportation_select_message")}
            </span>
          ),
        })
      }, 100)
      updateAccommodationCost(0.0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accommodationType])

  const [haveFlightCost, setHaveFlightCost] = useState(false)

  const fetchFlightCost = async (
    originAirportCode,
    destinationAirportCode,
    departureTime,
    returnTime,
    departureOffset,
    returnOffset
  ) => {
    return new Promise(resolve => {
      const departureDateISODate = departureDate
      const returnDateISODate = returnDate

      if (origin.cityCode !== null && destination.cityCode !== null) {
        amadeusFlightOffer(
          originAirportCode,
          destinationAirportCode,
          departureDateISODate,
          returnDateISODate,
          departureTime,
          returnTime,
          departureOffset,
          returnOffset
        )
          .then(response => response.json())
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            console.log("amadeus flight offer error", error)
            resolve(error)
          })
      } else {
        setLoading(false)
        resolve("no airport")
      }
    })
  }

  useEffect(() => {
    setScreenReaderStatus("")
    if (transportationType === "flight") {
      updateTransportationCost(acceptedFlight)
      setTimeout(() => {
        setTransportationMessage({
          element: (
            <a
              href="/"
              onClick={e => {
                handleFlightModalShow(e)
              }}
            >
              {formattedMessage("flight_estimate_your_fare_link")}
            </a>
          ),
        })
        setTimeout(() => {
          setScreenReaderStatus(localeCopy.tab_twice)
        }, 100)
      }, 100)
    } else if (transportationType === "train") {
      updateTransportationCost(0)
      setTimeout(() => {
        setTransportationMessage({
          element: (
            <div
              className="transportation-message"
              dangerouslySetInnerHTML={{
                __html: newTabLink(localeCopy.train_success.html),
              }}
            ></div>
          ),
        })
        setTimeout(() => {
          setScreenReaderStatus(localeCopy.tab_twice)
        }, 100)
      }, 100)
    } else if (transportationType === "rental") {
      updateTransportationCost(0)
      setTimeout(() => {
        setTransportationMessage({
          element: (
            <div
              className="transportation-message"
              dangerouslySetInnerHTML={{
                __html: newTabLink(localeCopy.rental_car_success.html),
              }}
            ></div>
          ),
        })
        setTimeout(() => {
          setScreenReaderStatus(localeCopy.tab_twice)
        }, 100)
      }, 100)
    } else if (transportationType === "private") {
      if (privateVehicleSuccess) {
        setPrivateKilometricsValue((returnDistance / 1000).toFixed(2))
      }
      updateTransportationCost(transportationEstimates.rentalCar.estimatedValue)

      displayTransportationMessage()
    } else if (transportationType === "notrequired") {
      updateTransportationCost(0.0)
      setTimeout(() => {
        setTransportationMessage({
          element: <div className="transportation-message"></div>,
        })
      }, 100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transportationType])

  const updateAccommodationCost = newValue => {
    setAccommodationCost(newValue.toFixed(2))
  }

  const updateTransportationCost = newValue => {
    setTransportationCost(newValue.toFixed(2))
  }

  const updateLocalTransportationCost = newValue => {
    setLocalTransportationCost(newValue.toFixed(2))
  }

  const updateSummaryCost = newValue => {
    setSummaryCost(newValue.toFixed(2))
  }

  const handleSubmit = async e => {
    setProvince("")
    setMealsByDay({})
    setMealCost({ total: 0.0 })
    setAccommodationType("")
    setTransportationType("")
    setTransportationCost("0.00")
    setAccommodationCost("0.00")
    setTransportationMessage({
      element: <span></span>,
    })
    setAccommodationMessage({
      element: <span></span>,
    })

    setOtherCost("0.00")
    setAcceptedFlight(0.0)
    setFlightResult({})
    setSelectedFlightPrice(0.0)
    setGeneralError(false)
    e.preventDefault()
    handleSubmitEstimateValidation()
      .then(async valid => {
        setLoading(true)
        setScreenReaderStatus(formattedMessage("aria_summary_loading"))
        setErrorPanel(false)
        setOtherCost("0.00")
        setSubmitValidationWarnings([])
        let flightResult = await fetchFlightCost(
          originAirportCode,
          destinationAirportCode,
          departureTime,
          returnTime,
          departureOffset,
          returnOffset
        )
        setFlightResult(flightResult)
        if (flightResult.numberOfResults > 0) {
          setAcceptedFlight(parseFloat(flightResult.median))
          setSelectedFlightPrice(parseFloat(flightResult.median))
          setInitialFlightResult(parseFloat(flightResult.median))
        } else {
          setAcceptedFlight(0.0)
        }
        let numberOfDays = Interval.fromDateTimes(
          departureDateLux,
          returnDateLux
        ).count("days")

        let provinceCode = destination.provinceCode
        setProvince(provinceCode)
        setMealsByDay(dailyMealTemplate(departureDateLux, returnDateLux))

        try {
          let distanceBetweenPlaces = await fetchDistanceBetweenPlaces(
            origin.acrdName,
            destination.acrdName
          )
          let distanceBetweenPlacesBody = await distanceBetweenPlaces.json()

          setPrivateVehicleSuccess(true)

          let drivingDistance =
            distanceBetweenPlacesBody.rows[0].elements[0].distance.value
          let returnCalc = drivingDistance * 2
          setReturnDistance(returnCalc)
        } catch (error) {
          console.log("distanceBetweenPlaces error", error)
          setPrivateVehicleSuccess(false)
          setReturnDistance(0)
        }

        await fetchHotelCost()
        fetchLocalTransportationRate(numberOfDays - 1)

        // get ACRD rate for destination

        // calculate meals for destination

        executeSummaryViewScroll()
        setScreenReaderStatus(formattedMessage("aria_summary_loaded"))
        setTransportationMessage({
          element: (
            <span>{formattedMessage("transportation_select_message")}</span>
          ),
        })
        setTimeout(() => {}, 100)
        setAccommodationMessage({
          element: (
            <span>{formattedMessage("accommodation_select_message")}</span>
          ),
        })
        setResult(true)
        setLoading(false)
        focusAccommodationSelect()
        setErrorPanel(false)
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
        setSubmitValidationWarnings(err.inner || [])
        setErrorPanel(true)
        executeErrorPanelViewScroll()
      })
  }

  let [initialResult, setInitialResult] = useState({})

  useEffect(() => {
    if (result === true) {
      setInitialResult({
        accommodationCost,
        transportationCost,
        localTransportationCost,
        mealCost,
        mealCostTotal: mealCost.total,
        otherCost,
        summaryCost,
        accommodationType,
        transportationType,
        returnDistance,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  const clearForm = async () => {
    setAccommodationCost(parseFloat(0.0).toFixed(2))
    setAccommodationMessage({ element: <span></span>, style: "primary" })
    setHaveFlightCost(false)
    setTransportationEstimates(transportationEstimatesInitialState)
    setOrigin({})
    setDestination({})
    setEmailConfirmationModalShow(false)
    setEmailModalShow(false)
    setLocalTransportationMessage({ element: <span></span>, style: "primary" })
    setLocalTransportationCost(parseFloat(0.0).toFixed(2))
    setDepartureDate(initialDates.departure)
    setReturnDate(initialDates.return)
    setMealsByDay({})
    setMealCost({ total: 0.0 })
    setOtherCost(parseFloat(0.0).toFixed(2))
    setResult(false)
    setSubmitValidationWarnings([])
    setInitialResult({})
    setFlightResult({})
    setTransportationType("")
    setAccommodationType("")
    setEmailErrorList([])
    setPrivateVehicleSuccess(false)
    setPrivateKilometricsValue(0)

    setOriginAirportCode("")
    setDestinationAirportCode("")
    setDepartureTime("07:00")
    setReturnTime("17:00")
    setDepartureOffset(2)
    setReturnOffset(2)

    setErrorPanel(false)

    // START OF HACK This is a hack to programatically clear the autocomplete inputs

    let originElement = document.querySelector("#autocomplete-origin")
    let destinationElement = document.querySelector("#autocomplete-destination")

    destinationElement.value = ""
    destinationElement.click()
    destinationElement.focus()
    destinationElement.blur()
    originElement.value = ""
    originElement.click()
    originElement.focus()
    originElement.blur()
    setTransportationMessage(initialTransportationMessage)
    setTimeout(function () {
      if (originElement) {
        originElement.focus()
      }
    }, 0)

    // END OF HACK
  }

  const handleSubmitEstimateValidation = () => {
    let target = {
      origin: origin.acrdName,
      destination: destination.acrdName,
      departureDate,
      returnDate,
    }
    let schema = yup.object().shape({
      origin: yup
        .string()
        .test(
          formattedMessage("estimate_origin_city_valid"),
          formattedMessage("estimate_origin_city_not_valid"),
          value => {
            return citiesList.includes(value)
          }
        ),
      destination: yup
        .string()
        .test(
          formattedMessage("estimate_destination_city_valid"),
          formattedMessage("estimate_destination_city_not_valid"),
          value => {
            return citiesList.includes(value)
          }
        ),
      departureDate: yup
        .date()
        .typeError(formattedMessage("estimate_departure_date_not_valid"))
        .required(),
      returnDate: yup
        .date()
        .typeError(formattedMessage("estimate_return_date_not_valid"))
        .required()
        .min(yup.ref("departureDate"), formattedMessage("no_time_travel")),
    })
    return schema.validate(target, { abortEarly: false })
  }

  const handleSubmitEmailValidation = () => {
    let target = {
      tripName,
      travellersName,
      travellersEmail,
      approversName,
      approversEmail,
      tripNotes,
      travellerIsPublicServant,
      travelCategory,
    }
    let schema = yup.object().shape({
      travellersName: yup
        .string()
        .typeError(
          `${formattedMessage("email_form_travellers_name")} ${formattedMessage(
            "is_not_valid"
          )}`
        )
        .required(
          `${formattedMessage("email_form_travellers_name")} ${formattedMessage(
            "is_required"
          )}`
        ),
      travellersEmail: yup
        .string()
        .email(
          `${formattedMessage(
            "email_form_travellers_email"
          )} ${formattedMessage("is_not_valid")}`
        )
        .typeError(
          `${formattedMessage(
            "email_form_travellers_email"
          )} ${formattedMessage("is_not_valid")}`
        )
        .required(
          `${formattedMessage(
            "email_form_travellers_email"
          )} ${formattedMessage("is_required")}`
        ),
      approversName: yup
        .string()
        .typeError(
          `${formattedMessage("email_form_approvers_name")} ${formattedMessage(
            "is_not_valid"
          )}`
        )
        .required(
          `${formattedMessage("email_form_approvers_name")} ${formattedMessage(
            "is_required"
          )}`
        ),
      approversEmail: yup
        .string()
        .email(
          `${formattedMessage("email_form_approvers_email")} ${formattedMessage(
            "is_not_valid"
          )}`
        )
        .typeError(
          `${formattedMessage("email_form_approvers_email")} ${formattedMessage(
            "is_not_valid"
          )}`
        )
        .required(
          `${formattedMessage("email_form_approvers_email")} ${formattedMessage(
            "is_required"
          )}`
        ),
      tripName: yup
        .string()
        .typeError(
          `${formattedMessage("email_form_trip_name")} ${formattedMessage(
            "is_not_valid"
          )}`
        )
        .required(
          `${formattedMessage("email_form_trip_name")} ${formattedMessage(
            "is_required"
          )}`
        ),
      travelCategory: yup
        .string()
        .typeError(
          `${formattedMessage("email_form_category_label")} ${formattedMessage(
            "is_not_valid"
          )}`
        )
        .required(
          `${formattedMessage("email_form_category_label")} ${formattedMessage(
            "is_required"
          )}`
        ),
      tripNotes: yup.string(),
    })
    return schema.validate(target, { abortEarly: false })
  }

  const errorList = () => {
    let list = []
    list = submitValidationWarnings.map((error, index) => {
      if (error.path === "destination") {
        error.path = "autocomplete-destination"
      } else if (error.path === "origin") {
        error.path = "autocomplete-origin"
      }
      return (
        <li key={index}>
          <a className="alert-link" href={"#" + error.path}>
            {error.errors}
          </a>
        </li>
      )
    })
    return list
  }

  const calculateTotal = async () => {
    let total =
      parseFloat(accommodationCost || 0) +
      parseFloat(transportationCost || 0) +
      parseFloat(localTransportationCost || 0) +
      parseFloat(mealCost.total || 0) +
      parseFloat(otherCost || 0)
    await updateSummaryCost(total)
  }

  const sendEmail = async () => {
    setEmailRequestLoading(true)
    setEmailValidationWarnings([])
    handleSubmitEmailValidation()
      .then(async valid => {
        setEmailValidationWarnings([])
        fetch("/api/sendEstimateEmailCeres", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            departureDate: departureDate,
            returnDate: returnDate,
            origin,
            destination,
            accommodationType,
            accommodationCost,
            accommodationMessage,
            transportationType,
            transportationCost,
            transportationMessage,
            localTransportationCost,
            localTransportationMessage,
            mealCost: mealCost.total,
            otherCost,
            tripName,
            travellersName,
            travellersEmail,
            approversName,
            approversEmail,
            tripNotes,
            summaryCost,
            travelCategory,
            travellerIsPublicServant,
            initialResult,
            returnDistance,
            applicableRates,
            privateVehicleRate,
            privateKilometricsValue,
            flightResult,
          }),
        })
          .then(function (response) {
            if (!response.ok) {
              setEmailRequestResult({
                status: "error",
                raw: response.statusText,
              })
              throw Error(response.statusText)
            }
            return response.json()
          })
          .then(function (data) {
            console.log("email service: ", data)
            setEmailRequestResult({ status: "success", raw: data })
          })
          .catch(err => {
            console.log("email service: ", err.message)
          })
      })
      .catch(err => {
        console.log("ERROR", err)
        setEmailValidationWarnings(err.inner)
        setEmailRequestLoading(false)
      })
  }

  useEffect(() => {
    if (emailRequestResult.status === "success") {
      setEmailModalShow(false)
      setEmailRequestLoading(false)
      setEmailConfirmationModalShow(true)
    } else if (emailRequestResult.status === "error") {
      setEmailModalShow(false)
      setEmailRequestLoading(false)
      setEmailConfirmationModalShow(true)
    }
  }, [emailRequestResult])

  const renderAccommodationTooltip = props => (
    <Tooltip id="button-tooltip" {...props}>
      {formattedMessage("accommodation_tooltip")}
    </Tooltip>
  )

  const renderEnterTravelInfoAboveTooltip = props => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        <div
          dangerouslySetInnerHTML={{
            __html: localeCopy.enter_travel_info_above,
          }}
        ></div>
      </Tooltip>
    )
  }

  useEffect(() => {
    if (result && parseInt(localTransportationCost) === 0) {
      setLocalTransportationMessage({
        element: (
          <div
            className="transportation-message alert-warning"
            role="alert"
            dangerouslySetInnerHTML={{
              __html: localeCopy.local_tranportation_zero.html,
            }}
          ></div>
        ),
      })
    } else if (
      result &&
      localTransportationEstimate !== parseInt(localTransportationCost)
    ) {
      setLocalTransportationMessage({
        element: (
          <div
            className="transportation-message"
            dangerouslySetInnerHTML={{
              __html: localeCopy.local_transportation_manual.html,
            }}
          ></div>
        ),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localTransportationCost])

  useEffect(() => {
    setScreenReaderStatus("")
    if (transportationType === "flight") {
      if (origin.cityCode === null || destination.cityCode === null) {
        setTimeout(() => {
          setTransportationMessage({
            element: (
              <span>{formattedMessage("flight_message_no_airport")}</span>
            ),
          })
        }, 100)
      } else if (parseFloat(transportationCost) === parseFloat(0.0)) {
        setTimeout(() => {
          setTransportationMessage({
            element: (
              <div className="transportation-message alert-warning ">
                <div
                  className="d-inline"
                  dangerouslySetInnerHTML={{
                    __html: localeCopy.flight_zero.text,
                  }}
                ></div>
                <span>
                  {" "}
                  <a
                    href="/"
                    onClick={e => {
                      handleFlightModalShow(e)
                    }}
                  >
                    {formattedMessage("flight_estimate_your_fare_link")}
                  </a>
                </span>
              </div>
            ),
          })
          setTimeout(() => {
            if (transportRef.current === document.activeElement) {
              setScreenReaderStatus(localeCopy.tab_once)
            } else if (flightSelectRef.current === document.activeElement) {
              setScreenReaderStatus(localeCopy.tab_twice)
            }
          }, 100)
        }, 100)
      } else if (
        parseFloat(transportationCost) === parseFloat(initialFlightResult)
      ) {
        let message = formattedMessage("flight_selected_fare_preselected")
        message = message.replace(
          "{departureIATACode}",
          `<strong>${originAirportCode}</strong>`
        )
        message = message.replace(
          "{destinationIATACode}",
          `<strong>${destinationAirportCode}</strong>`
        )
        // eslint-disable-next-line no-template-curly-in-string
        message = message.replace(
          "{flightPrice}",
          `<strong>${localCurrencyDisplay(parseFloat(acceptedFlight))}</strong>`
        )
        setTimeout(() => {
          setTransportationMessage({
            element: (
              <div>
                <div dangerouslySetInnerHTML={{ __html: `${message}` }}></div>
                <span>
                  {" "}
                  <a
                    href="/"
                    onClick={e => {
                      handleFlightModalShow(e)
                    }}
                  >
                    {formattedMessage("flight_regenerate_estimate")}
                  </a>
                </span>
              </div>
            ),
          })
          setTimeout(() => {
            setScreenReaderStatus(localeCopy.tab_twice)
          }, 100)
        }, 100)
      } else if (
        parseFloat(transportationCost) === parseFloat(flightResult.minimum) ||
        parseFloat(transportationCost) === parseFloat(flightResult.maximum) ||
        parseFloat(transportationCost) === parseFloat(flightResult.median)
      ) {
        let message = formattedMessage("flight_selected_fare")
        message = message.replace(
          "{departureIATACode}",
          `<strong>${originAirportCode}</strong>`
        )
        message = message.replace(
          "{destinationIATACode}",
          `<strong>${destinationAirportCode}</strong>`
        )

        message = message.replace(
          "{flightPrice}",
          `<strong>${localCurrencyDisplay(parseFloat(acceptedFlight))}</strong>`
        )
        setTimeout(() => {
          setTransportationMessage({
            element: (
              <div>
                <div dangerouslySetInnerHTML={{ __html: `${message}` }}></div>
                <span>
                  {" "}
                  <a
                    href="/"
                    onClick={e => {
                      handleFlightModalShow(e)
                    }}
                  >
                    {formattedMessage("flight_regenerate_estimate")}
                  </a>
                </span>
              </div>
            ),
          })
          setTimeout(() => {
            setScreenReaderStatus(localeCopy.tab_twice)
          }, 100)
        }, 100)
      } else if (transportationCost > 0) {
        setTimeout(() => {
          setTransportationMessage({
            element: (
              <span>
                {formattedMessage("flight_custom_fare_entered")}{" "}
                <a
                  href="/"
                  onClick={e => {
                    handleFlightModalShow(e)
                  }}
                >
                  {formattedMessage("flight_estimate_your_fare_link")}
                </a>
              </span>
            ),
          })
          setTimeout(() => {
            if (transportRef.current === document.activeElement) {
              setScreenReaderStatus(localeCopy.tab_once)
            }
          }, 100)
        }, 100)
      }
    }
    if (result && transportationType === "train") {
      console.log("validate train price")
    }
    if (result && transportationType === "private") {
      console.log("validate private price")
    }
    if (result && transportationType === "rental") {
      console.log("validate rental price")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transportationCost, transportationType, haveFlightCost])

  const checkForEmailErrors = () => {
    const errorArray = []
    if (accommodationType === "") {
      errorArray.push({
        sourceId: "accommodationType",
        text: localeCopy.email_error_accom_type,
      })
    }
    if (
      accommodationType !== "" &&
      parseFloat(accommodationCost) === parseFloat(0.0) &&
      accommodationType !== "notrequired"
    ) {
      errorArray.push({
        sourceId: "accommodation_total",
        text: localeCopy.email_error_accom_value,
      })
    }
    if (transportationType === "") {
      errorArray.push({
        sourceId: "transportationType",
        text: localeCopy.email_error_transport_type,
      })
    }
    if (
      transportationType !== "" &&
      parseFloat(transportationCost) === parseFloat(0.0) &&
      transportationType !== "notrequired"
    ) {
      errorArray.push({
        sourceId: "transportation_total",
        text: localeCopy.email_error_transport_value,
      })
    }
    setEmailErrorList(errorArray)
    setEmailClicked(true)
  }

  useEffect(() => {
    if (emailClicked) {
      if (emailErrorList.length > 0) {
        setEmailErrorPanel(true)
        executeEmailErrorPanelViewScroll()
        setEmailClicked(false)
      } else {
        setEmailModalShow(true)
        setEmailClicked(false)
      }
    }
  }, [emailErrorList, emailClicked])

  return (
    <div className="mb-4">
      <EmailModal
        validationWarnings={emailValidationWarnings}
        setEmailValidationWarnings={setEmailValidationWarnings}
        show={emailModalShow}
        onHide={() => setEmailModalShow(false)}
        sendEmail={() => sendEmail()}
        tripName={tripName}
        setTripName={setTripName}
        travellersName={travellersName}
        setTravellersName={setTravellersName}
        travellersEmail={travellersEmail}
        setTravellersEmail={setTravellersEmail}
        approversName={approversName}
        setApproversName={setApproversName}
        approversEmail={approversEmail}
        setApproversEmail={setApproversEmail}
        setTripNotes={setTripNotes}
        tripNotes={tripNotes}
        emailRequestLoading={emailRequestLoading}
        messages={localeCopy}
        setTravellerIsPublicServant={setTravellerIsPublicServant}
        travellerIsPublicServant={travellerIsPublicServant}
        travelCategory={travelCategory}
        setTravelCategory={setTravelCategory}
      />
      <EmailConfirmationModal
        show={emailConfirmationModalShow}
        onHide={() => setEmailConfirmationModalShow(false)}
        emailRequestResult={emailRequestResult}
        approversName={approversName}
        clearForm={clearForm}
        messages={localeCopy}
      />
      <MealsModal
        mealsByDay={mealsByDay}
        mealCost={mealCost}
        show={mealsModalShow}
        onHide={() => setMealsModalShow(false)}
        setMealsByDay={setMealsByDay}
        messages={localeCopy}
        locale={locale}
      />
      <FlightModal
        show={flightModalShow}
        onHide={() => setFlightModalShow(false)}
        messages={localeCopy}
        locale={locale}
        destination={destination}
        origin={origin}
        departureDate={departureDate}
        returnDate={returnDate}
        fetchFlightCost={fetchFlightCost}
        selectedFlightPrice={selectedFlightPrice}
        setSelectedFlightPrice={setSelectedFlightPrice}
        flightResult={flightResult}
        setFlightResult={setFlightResult}
        acceptedFlight={acceptedFlight}
        setAcceptedFlight={setAcceptedFlight}
        setTransportationCost={setTransportationCost}
        updateTransportationCost={updateTransportationCost}
        setTransportationType={setTransportationType}
        validationWarnings={flightValidationWarnings}
        setValidationWarnings={setFlightValidationWarnings}
        originAirportCode={originAirportCode}
        destinationAirportCode={destinationAirportCode}
        departureTime={departureTime}
        returnTime={returnTime}
        departureOffset={departureOffset}
        returnOffset={returnOffset}
        setOriginAirportCode={setOriginAirportCode}
        setDestinationAirportCode={setDestinationAirportCode}
        setDepartureTime={setDepartureTime}
        setReturnTime={setReturnTime}
        setDepartureOffset={setDepartureOffset}
        setReturnOffset={setReturnOffset}
      />

      {localeCopy.simplify_content_show && (
        <div>
          <h2 className="mb-4">{localeCopy.simplify_title}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: newTabLink(localeCopy.simplify_content.html),
            }}
          ></div>
        </div>
      )}

      <section className="card bg-light p-4 mb-4 mt-5">
        <h2 className="mb-4" id="h2-label">
          {localeCopy.title.text}
        </h2>
        <div
          className="lead mb-3"
          dangerouslySetInnerHTML={{ __html: localeCopy.lead.html }}
        ></div>
        {errorPanel !== false && (
          <section
            tabIndex={"0"}
            className="focus-only alert alert-danger alert-danger-banner"
            role="alert"
            ref={errorPanelView}
          >
            <h3>{formattedMessage("estimate_error_title")}</h3>
            <p>{formattedMessage("estimate_error_lead")}</p>
            <ol>{errorList()}</ol>
          </section>
        )}
        <form
          id="estimates-form"
          className="form-group row"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="col-sm-7" ref={summaryView}>
            <InputDatalist
              validationWarnings={submitValidationWarnings}
              setValidationWarnings={setSubmitValidationWarnings}
              label={formattedMessage("estimate_origin")}
              name="origin"
              options={filteredCitiesList}
              updateValue={setOrigin}
              localeCopy={localeCopy}
            />
          </div>
          <div className="col-sm-6"></div>
          <div className="col-sm-7">
            <InputDatalist
              validationWarnings={submitValidationWarnings}
              setValidationWarnings={setSubmitValidationWarnings}
              label={formattedMessage("estimate_destination")}
              name="destination"
              options={filteredCitiesList}
              updateValue={setDestination}
              className="col-sm-6"
              localeCopy={localeCopy}
            />
          </div>
          <div className="col-sm-3"></div>
          <div className="col-sm-4">
            <label htmlFor="departureDate">
              {localeCopy.datepicker_start_date}
              <small className="pl-1">({localeCopy.required})</small>
              <small id="departure-datepicker-help" className="form-text">
                {localeCopy.date_format_description}
              </small>
            </label>
            <input
              id="departureDate"
              name="departureDate"
              type="date"
              min={today}
              max={twentyYearsFromToday}
              lang={locale}
              value={departureDate}
              className="form-control mb-4"
              onChange={event => {
                setDepartureDate(event.target.value)
              }}
            />
          </div>
          <div className="col-sm-4">
            <label htmlFor="returnDate">
              {localeCopy.datepicker_end_date}
              <small className="pl-1">({localeCopy.required})</small>
              <small id="return-datepicker-help" className="form-text">
                {localeCopy.date_format_description}
              </small>
            </label>
            <input
              id="returnDate"
              name="returnDate"
              type="date"
              min={today}
              max={twentyYearsFromToday}
              lang={locale}
              value={returnDate}
              className="form-control"
              onChange={event => {
                setReturnDate(event.target.value)
              }}
            />
          </div>

          <div className="col-sm-3"></div>
          <div className="col-sm-12">
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="submit"
              className="btn btn-primary px-5 my-3 mr-3 my-md-0"
            >
              {formattedMessage("estimate")}
            </button>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            {showClear && (
              <button
                type="button"
                id="clear-button"
                className="btn btn-outline-dark px-5"
                onClick={() => {
                  clearForm()
                }}
              >
                {formattedMessage("clear")}
              </button>
            )}
            {loading && (
              <FaSpinner
                focusable="false"
                aria-hidden="true"
                className="fa-spin ml-3"
                size="24"
              />
            )}
            <div aria-live="polite" className="sr-only">
              {screenReaderStatus}
            </div>
          </div>
        </form>

        {generalError && (
          <div className="alert-icon alert-danger">
            <div className="icon" aria-hidden="true">
              <FaExclamationTriangle
                focusable="false"
                aria-hidden="true"
                size="24"
              />
            </div>
            <div className="message">
              <h3>{formattedMessage("estimate_application_error")}</h3>
              <p>{formattedMessage("estimate_application_error_text")}</p>
            </div>
          </div>
        )}
        {result && (
          <>
            <div className="mb-5 mt-4 border-bottom" />
            <h3 className="mb-4">
              {formattedMessage("estimate_summary_title")}
            </h3>

            {emailErrorList.length > 0 && (
              <section
                tabIndex={"0"}
                className="focus-only alert alert-danger alert-danger-banner"
                role="alert"
                ref={emailErrorPanelView}
              >
                <h3>{formattedMessage("estimate_error_title")}</h3>
                <p>{formattedMessage("estimate_error_lead")}</p>
                <ol>
                  {emailErrorList.map((error, index) => (
                    <li key={`error-${index}`}>
                      <a className="alert-link" href={`#${error.sourceId}`}>
                        {error.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <div className="row mb-4">
              <div className="col-sm-12 mb-2">
                <h4 className="font-weight-bold">
                  <FaBed
                    focusable="false"
                    aria-hidden="true"
                    className="mr-2"
                    size="25"
                    fill="#9E9E9E"
                  />
                  {formattedMessage("accommodation")}
                </h4>
              </div>
              <div className="col-sm-4 align-self-center">
                <div className="align-self-center">
                  <div>
                    <div id={"accommodation_container"}>
                      <ConditionalWrap
                        condition={!result}
                        wrap={children => (
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderEnterTravelInfoAboveTooltip}
                          >
                            {children}
                          </OverlayTrigger>
                        )}
                      >
                        <select
                          ref={accommodationSelect}
                          disabled={!result}
                          aria-label={formattedMessage("accommodation_type")}
                          className="custom-select mb-2"
                          value={accommodationType}
                          onChange={e => {
                            if (result) {
                              setAccommodationType(e.target.value)
                            }
                          }}
                          id="accommodationType"
                        >
                          <option disabled value="">
                            {formattedMessage("select")}
                          </option>
                          <option value="hotel">
                            {formattedMessage("hotel")}
                          </option>
                          <option value="private">
                            {formattedMessage("private")}
                          </option>
                          <option value="notrequired">
                            {formattedMessage("not_required")}
                          </option>
                        </select>
                      </ConditionalWrap>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 align-self-center">
                <ConditionalWrap
                  condition={!result}
                  wrap={children => (
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderEnterTravelInfoAboveTooltip}
                    >
                      {children}
                    </OverlayTrigger>
                  )}
                >
                  <div className="input-group mb-2">
                    {locale === "en-ca" && (
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="accommodation-dollar-sign"
                        >
                          $
                        </span>
                      </div>
                    )}
                    <input
                      readOnly={
                        !result ||
                        accommodationType === "private" ||
                        accommodationType === "notrequired" ||
                        accommodationType === ""
                      }
                      className="form-control"
                      id={"accommodation_total"}
                      aria-label={formattedMessage("accommodation_total")}
                      name={formattedMessage("accommodation_total")}
                      onChange={e => {
                        if (!result) return
                        if (parseFloat(e.target.value) > acrdTotal) {
                          setAccommodationCost(e.target.value)
                          if (acrdFetchSuccess) {
                            let message = localeCopy.hotel_above_estimate.html
                            message = message.replace(
                              "{daily rate}",
                              `<strong>${localCurrencyDisplay(
                                applicableRates[0].rate.max_rate
                              )}</strong>`
                            )
                            message = message.replace(
                              "{tripTotal}",
                              `<strong>${localCurrencyDisplay(
                                acrdTotal
                              )}</strong>`
                            )
                            setTimeout(() => {
                              setAccommodationMessage({
                                element: (
                                  <div
                                    className="mb-0 alert-warning"
                                    role="alert"
                                  >
                                    <>
                                      <div
                                        className="transportation-message alert-warning"
                                        role="alert"
                                        dangerouslySetInnerHTML={{
                                          __html: message,
                                        }}
                                      ></div>
                                      <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderAccommodationTooltip}
                                      >
                                        <button
                                          type="button"
                                          className="btn btn-default"
                                          aria-label={formattedMessage(
                                            "accommodation_tooltip"
                                          )}
                                        >
                                          <FaQuestionCircle
                                            focusable="false"
                                            aria-hidden="true"
                                            className="ml-2 mb-1"
                                            size="15"
                                            fill="#9E9E9E"
                                          />
                                        </button>
                                      </OverlayTrigger>
                                    </>
                                  </div>
                                ),
                                style: "warn",
                              })
                            }, 100)
                          } // else { provide message }
                        } else if (parseFloat(e.target.value) === 0) {
                          setAccommodationCost(e.target.value)
                          // localeCopy.hotel_below_estimate.html = localeCopy.hotel_below_estimate.html.replace('{daily rate}', `<strong>${acrdTotal}</strong>`)
                          setTimeout(() => {
                            setAccommodationMessage({
                              element: (
                                <div
                                  className="mb-0 alert-warning"
                                  role="alert"
                                >
                                  <>
                                    <div
                                      className="transportation-message alert-warning"
                                      role="alert"
                                      dangerouslySetInnerHTML={{
                                        __html: localeCopy.hotel_zero.html,
                                      }}
                                    ></div>
                                  </>
                                </div>
                              ),
                              style: "warn",
                            })
                          }, 100)
                        } else if (parseFloat(e.target.value) <= acrdTotal) {
                          setAccommodationCost(e.target.value)
                          let message = localeCopy.hotel_below_estimate.html
                          message = message.replace(
                            "{daily rate}",
                            `<strong>${localCurrencyDisplay(
                              applicableRates[0].rate.max_rate
                            )}</strong>`
                          )
                          message = message.replace(
                            "{tripTotal}",
                            `<strong>${localCurrencyDisplay(
                              acrdTotal
                            )}</strong>`
                          )
                          setTimeout(() => {
                            setAccommodationMessage({
                              element: (
                                <div className="mb-0">
                                  <div
                                    className="transportation-message"
                                    dangerouslySetInnerHTML={{
                                      __html: message,
                                    }}
                                  ></div>
                                </div>
                              ),
                              style: "success",
                            })
                          }, 100)
                        } else {
                          setAccommodationCost(e.target.value)
                        }
                      }}
                      onBlur={e => {
                        if (isNaN(parseFloat(e.target.value))) {
                          setAccommodationCost(parseFloat(0.0).toFixed(2))
                        } else {
                          setAccommodationCost(
                            parseFloat(e.target.value).toFixed(2) || 0.0
                          )
                        }
                        calculateTotal()
                      }}
                      value={accommodationCost}
                      type="number"
                      noValidate
                      min="0"
                      step="0.01"
                    ></input>
                    {locale === "fr-ca" && (
                      <div className="input-group-append">
                        <span
                          className="input-group-text"
                          id="accommodation-dollar-sign"
                        >
                          $
                        </span>
                      </div>
                    )}
                  </div>
                </ConditionalWrap>
              </div>
              <div
                className="col-sm-5 align-self-center text-wrap mb-2"
                id="accommodation-message"
                aria-live="polite"
              >
                {accommodationMessage.element}
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-sm-12 mb-2">
                <h4 className="font-weight-bold">
                  <FaPlane
                    focusable="false"
                    aria-hidden="true"
                    className="mr-2"
                    size="25"
                    fill="#9E9E9E"
                  />
                  {formattedMessage("transportation")}
                </h4>
              </div>
              <div className="col-sm-4 align-self-center">
                <div className="align-self-center">
                  <div>
                    {/* <label htmlFor={name}>{label}</label> */}
                    <div id={"transportation_container"}>
                      <ConditionalWrap
                        condition={!result}
                        wrap={children => (
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderEnterTravelInfoAboveTooltip}
                          >
                            {children}
                          </OverlayTrigger>
                        )}
                      >
                        <select
                          ref={flightSelectRef}
                          disabled={!result}
                          aria-label={formattedMessage("transportation_type")}
                          className="custom-select mb-2"
                          value={transportationType}
                          onChange={e => {
                            if (result) {
                              setTransportationType(e.target.value)
                            }
                          }}
                          id="transportationType"
                        >
                          <option disabled value="">
                            {formattedMessage("select")}
                          </option>
                          <option value="flight">
                            {formattedMessage("flight")}
                          </option>
                          <option value="train">
                            {formattedMessage("train")}
                          </option>
                          <option value="rental">
                            {formattedMessage("rental")}
                          </option>
                          <option value="private">
                            {formattedMessage("private_vehicle")}
                          </option>
                          <option value="notrequired">
                            {formattedMessage("not_required")}
                          </option>
                        </select>
                      </ConditionalWrap>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 align-self-center">
                <ConditionalWrap
                  condition={!result}
                  wrap={children => (
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderEnterTravelInfoAboveTooltip}
                    >
                      {children}
                    </OverlayTrigger>
                  )}
                >
                  <div className="input-group mb-2">
                    {locale === "en-ca" && (
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="transportation-dollar-sign"
                        >
                          $
                        </span>
                      </div>
                    )}
                    <input
                      ref={transportRef}
                      className={`form-control`}
                      id={"transportation_total"}
                      aria-label={formattedMessage("transportation_total")}
                      name={formattedMessage("transportation_total")}
                      onChange={e => {
                        if (result) {
                          setTransportationCost(e.target.value)
                        }
                      }}
                      onBlur={e => {
                        if (isNaN(parseFloat(e.target.value))) {
                          setTransportationCost(parseFloat(0.0).toFixed(2))
                        } else {
                          setTransportationCost(
                            parseFloat(e.target.value).toFixed(2) || 0.0
                          )
                        }
                        calculateTotal()
                      }}
                      value={transportationCost}
                      readOnly={
                        !result || transportationType === "private"
                          ? true
                          : false ||
                            transportationType === "" ||
                            transportationType === "notrequired"
                      }
                      type="number"
                      min="0"
                      noValidate
                      step="0.01"
                    ></input>
                    {locale === "fr-ca" && (
                      <div className="input-group-append">
                        <span
                          className="input-group-text"
                          id="transportation-dollar-sign"
                        >
                          $
                        </span>
                      </div>
                    )}
                  </div>
                </ConditionalWrap>
              </div>
              <div
                className="col-sm-5 align-self-center text-wrap mb-2"
                id="transportation-message"
                aria-live="polite"
              >
                {transportationMessage.element}
              </div>
            </div>

            <div className="row mb-4">
              {transportationType === "private" && (
                <div className="col-sm-4 align-self-center text-wrap mb-2">
                  <Form inline>
                    <Form.Group>
                      <Form.Check
                        id="kilometricsManuallyCheckBox"
                        type="checkbox"
                        className="mr-2"
                        aria-label={localeCopy.enable_manual_km_checkbox_label}
                        checked={enterKilometricsDistanceManually}
                        onChange={e =>
                          setEnterKilometricsDistanceManually(
                            !enterKilometricsDistanceManually
                          )
                        }
                      />
                      {enterKilometricsDistanceManually && (
                        <InputGroup>
                          <Form.Control
                            type="privateKilometrics"
                            value={privateKilometricsValue}
                            onKeyPress={e => {
                              e.key === "Enter" && e.preventDefault()
                            }}
                            onChange={e => {
                              setPrivateKilometricsValue(e.target.value)
                            }}
                            aria-describedby="km"
                            type="number"
                            id="kilometricsManuallyInput"
                            aria-label={localeCopy.manual_km_input_label}
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="km">km</InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      )}
                      {!enterKilometricsDistanceManually && (
                        <span>
                          {formattedMessage(
                            "private_vehicle_enter_distance_manually"
                          )}
                        </span>
                      )}
                    </Form.Group>
                  </Form>
                </div>
              )}
            </div>

            <EstimatorRow
              locale={locale}
              overlayRender={renderEnterTravelInfoAboveTooltip}
              result={result}
              value={localTransportationCost}
              name={formattedMessage("local_transportation_total")}
              ariaLabel={formattedMessage("local_transportation_total")}
              id="localTransportation"
              description="localTransportationDescription"
              icon={
                <FaTaxi
                  focusable="false"
                  aria-hidden="true"
                  className="mr-2"
                  size="25"
                  fill="#9E9E9E"
                />
              }
              aria-hidden="true"
              title={formattedMessage("local_transportation")}
              calculateTotal={calculateTotal}
              updateCost={setLocalTransportationCost}
              message={localTransportationMessage}
              readOnly={!result}
            />
            <EstimatorRow
              locale={locale}
              overlayRender={renderEnterTravelInfoAboveTooltip}
              result={result}
              value={mealCost.total}
              name={formattedMessage("meals_and_incidentals_total")}
              ariaLabel={formattedMessage("meals_and_incidentals_total")}
              id="mealsAndIncidentals"
              description="selectMealsToInclude"
              message={{
                element: result ? (
                  <>
                    {formattedMessage("select_meals_description")}{" "}
                    <a
                      href="/"
                      onClick={e => {
                        handleMealsModalShow(e)
                      }}
                    >
                      {formattedMessage("select_meals_link")}
                    </a>
                  </>
                ) : (
                  <span></span>
                ),
              }}
              icon={
                <FaUtensils
                  focusable="false"
                  aria-hidden="true"
                  className="mr-2"
                  size="25"
                  fill="#9E9E9E"
                />
              }
              aria-hidden="true"
              title={formattedMessage("meals_and_incidentals")}
              calculateTotal={calculateTotal}
              updateCost={amount => setMealCost({ total: amount })}
              readOnly={true}
            />
            <EstimatorRow
              locale={locale}
              overlayRender={renderEnterTravelInfoAboveTooltip}
              result={result}
              value={otherCost || ""}
              name={formattedMessage("other_allowances_total")}
              ariaLabel={formattedMessage("other_allowances_total")}
              id="otherAllowances"
              message={{
                element: result ? (
                  formattedMessage("other_allowances_message")
                ) : (
                  <span></span>
                ),
              }}
              icon={
                <FaSuitcase
                  focusable="false"
                  aria-hidden="true"
                  className="mr-2"
                  size="25"
                  fill="#9E9E9E"
                />
              }
              aria-hidden="true"
              title={formattedMessage("other_allowances")}
              calculateTotal={calculateTotal}
              updateCost={setOtherCost}
              tooltipIcon={FaQuestionCircle}
              tooltipText={
                <div
                  dangerouslySetInnerHTML={{
                    __html: localeCopy.other_tooltip_text,
                  }}
                ></div>
              }
              toolTipLabel={localeCopy.other_tooltip_text}
              readOnly={!result}
            />
            <div className="row mb-4">
              <div className="col-sm-7 align-self-center text-right">
                <div className="mb-3 border-bottom" />
                <strong className="mr-2">
                  {formattedMessage("total_cost")}
                </strong>
                {localCurrencyDisplay(parseFloat(summaryCost))}
              </div>
              <div className="col-sm-5 align-self-center text-wrap"></div>
            </div>
            <div className="row ml-1">
              <div className="col-sm-12">
                <Button
                  variant="primary"
                  className="px-5 mb-2"
                  onClick={() => {
                    checkForEmailErrors()
                  }}
                  // aria-describedby="email-button-validation"
                >
                  {formattedMessage("email")}
                </Button>
              </div>
              {/* <Button variant="outline-primary" className="px-5 ml-3" onClick={() => { window.print() }}>formattedMessage('print" /></Button> */}
            </div>
          </>
        )}
      </section>

      <div className="card bg-white py-4 px-5 mb-4">
        <div className="row">
          <details>
            <summary>
              <h2 className="h4 d-inline mb-5">
                <FaCalculator
                  focusable="false"
                  aria-hidden="true"
                  size="20"
                  className="mb-1 mr-2"
                />
                {localeCopy.explainer_title.text}
              </h2>
            </summary>

            <React.Fragment>
              <div
                className="col-sm-12 mt-2"
                dangerouslySetInnerHTML={{
                  __html: newTabLink(localeCopy.explainer_body.html),
                }}
              ></div>
            </React.Fragment>
          </details>
        </div>
      </div>
      <div className="card bg-white py-4 px-5 mb-4">
        <div className="row">
          <details>
            <summary>
              <h2 className="h4 d-inline mb-5">
                {formattedMessage("disclaimer")}
              </h2>
            </summary>

            <div className="px-5 pt-3 pb-3">
              {formattedMessage("disclaimer_body")}
            </div>
          </details>
        </div>
      </div>
      <QuickReferenceCard messages={localeCopy} />
    </div>
  )
}

export default Estimator
