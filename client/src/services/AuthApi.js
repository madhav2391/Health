import axios from "../common/config/AxiosConfig";
import {
    loginRequest,
    loginFailure,
    loginSuccess,
    logoutFailure,
    logoutRequest,
    logoutSuccess
} from "../actionCreators/AuthActions";
// import { getAllHospitals } from "./CreateApi";

import { changePasswordFailure, changePasswordRequest, changePasswordSuccess } from "../actionCreators/ChangePasswordActions";
import { alertError, alertSuccess } from "../actionCreators/AlertActions";

export const userLogin = (userName, password, history) => {
    //concept used below is call back. there we are sending a function as a parameter to parent function
    console.log("username:", userName);
    console.log("passw:", password);
    return (dispatch) => {
        dispatch(loginRequest());
        axios
            .post("/login/signin", { userName, password }) // /login/authentication part will be attached to base url
            .then((res) => {
                if (!res.data) { throw new Error("Username or password is incorrect."); } // this is added so mock server can be used(jugad)
                dispatch(loginSuccess(res.data));
                localStorage.setItem("jwt", res.data.accessToken);
                console.log("-------this is then loginnn------- ", res);
                dispatch(alertSuccess("Login Successful!"));
                localStorage.setItem("userId", res.data.id);
                localStorage.setItem("hid",res.data.hospitalId);
                localStorage.setItem("role",res.data.roles[0]);
                // if (res.data.users[0].firstLogin)
                //     history.push("/changePassword");
                // else//
                // getAllHospitals();
                history.push(`/dashboard/`);//${res.data.users[0].userId} `); // discards existing route completly and adds the "/dashboard" after localhost:3000
            })
            .catch((err) => {
                dispatch(loginFailure(err.message));
                dispatch(alertError(err.message));

                console.log("-----this is catch------", err);

            })
    }
}

export const userLogout = (userName, history) => {
    return (dispatch) => {
        dispatch(logoutRequest());
        localStorage.removeItem("jwt");
        localStorage.removeItem("userId");
        localStorage.removeItem("hid");
        localStorage.removeItem("Value");
        localStorage.removeItem("Field");
        localStorage.removeItem("role");

        history.push("/login");

        // axios
        //     .post ("/logout",{userName})
        //     .then ((message) => {
        //         dispatch(logoutSuccess());
        //         localStorage.removeItem("jwt");
        //         localStorage.removeItem("userId");
        //         console.log("-------logout then------- ", message);
        //         dispatch(alertSuccess("Logout Successful!"));
        //         history.push("/login");

        //     })
        //     .catch ((err) => { // checking not done
        //         dispatch(logoutFailure(err));
        //         dispatch(alertError(err.message));

        //         console.log("---------logout error-------", err);
        //     }

        //     ) 
    }
}

export const changePassword = (userName, newPassword, history) => {
    return (dispatch) => {
        dispatch(changePasswordRequest());
        console.log("changePasswordRequest")
        axios
            .post("/changePassword", { userName, newPassword })
            .then((message) => {
                dispatch(changePasswordSuccess());
                console.log("$$$$$$ change password then $$$$$$$", message);
                history.push("/dashboard");
                dispatch(alertSuccess("Change Password Successful!"));
            })
            .catch((err) => {
                dispatch(changePasswordFailure(err));
                console.log("$$$$$$ change password catch $$$$$$$", err);
                dispatch(alertError(err.message));

            })
    }
}
