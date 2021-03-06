import { GET_PATIENTS_REQUEST, 
    GET_PATIENTS_SUCCESS, 
    GET_PATIENTS_FAILURE,
    ADD_PATIENTS_REQUEST,
    ADD_PATIENTS_SUCCESS,
    ADD_PATIENTS_FAILURE,
    SET_CURRENT_PATIENT
 } from "../common/constants/ActionConstants"; 


export const getPatientsRequest = () => ({
    type: GET_PATIENTS_REQUEST
})

export const getPatientsSuccess = (patientDetails) => {
    return {
        type: GET_PATIENTS_SUCCESS,
        patientDetails: patientDetails
    }
}

export const getPatientsFailure = (err) => ({
    type: GET_PATIENTS_FAILURE,
    err: err
})

export const addPatientRequest = () => ({
    type: ADD_PATIENTS_REQUEST
})

export const addPatientSuccess = () => {
    return {
        type: ADD_PATIENTS_SUCCESS
    }
}

export const addPatientFailure = () => ({
    type: ADD_PATIENTS_FAILURE
})

export const setPatient = (patientDetail) => {
    return {
        type: SET_CURRENT_PATIENT,
        patientDetail: patientDetail
    }
}