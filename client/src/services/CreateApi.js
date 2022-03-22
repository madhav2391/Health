import axios from "../common/config/AxiosConfig";
import { alertError, alertSuccess } from "../actionCreators/AlertActions";

export const addAdmin = (fname, lname, email, hashedPassword, role, gender,orgName,phoneNumber,history) => {
    return(dispatch) => {
        axios
            .post("/addAdmin",{fname, lname, email, hashedPassword, role, gender,orgName,phoneNumber})
            .then ( (res) => {
                console.log("-------this is then------- ", res);
                dispatch(alertSuccess("Admin add sucessful"));
                history.push("/dashboard");
            }
            )
            .catch ((err) => { // checking not done
                dispatch(alertError(err.message));
                console.log("---------Admin add error-------", err);
            }
            )
    }
}

export const addDoctor = (fname, lname, email, hashedPassword, role, gender,hospitalName,phoneNumber,history) => {
    return(dispatch) => {
        axios
            .post("/addDoctor",{fname, lname, email, hashedPassword, role, gender,hospitalName,phoneNumber})
            .then ( (res) => {
                console.log("-------this is then------- ", res);
                dispatch(alertSuccess("Doctor add sucessful"));
                history.push("/dashboard");
            }
            )
            .catch ((err) => { // checking not done
                dispatch(alertError(err.message));
                console.log("---------doctor add error-------", err);
            }
            )
    }
}

export const addAdminOrg = (email,orgName,phoneNumber,stateName,district,city,pincode,history) => {
    return(dispatch) => {
        axios
            .post("/addAdminOrg",{email,orgName,phoneNumber,stateName,district,city,pincode})
            .then ( (res) => {
                console.log("-------this is then------- ", res);
                dispatch(alertSuccess("Admin org add sucessful"));
                history.push("/dashboard");
            }
            )
            .catch ((err) => { // checking not done
                dispatch(alertError(err.message));
                console.log("---------add admin organisation error-------", err);
            }
            )
    }
}

export const addHospital = (email,role,hospitalName,phoneNumber,stateName,district,city,pincode,history) => {
    return(dispatch) => {
        axios
            .post("/addHospital",{email,role,hospitalName,phoneNumber,stateName,district,city,pincode})
            .then ( (res) => {
                console.log("-------this is then------- ", res);
                dispatch(alertSuccess("Hospital add sucessful"));
                history.push("/dashboard");
            }
            )
            .catch ((err) => { // checking not done
                dispatch(alertError(err.message));
                console.log("---------add admin organisation error-------", err);
            }
            )
    }
}