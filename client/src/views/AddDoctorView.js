import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "../common/config/AxiosConfig";
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@material-ui/core/TextField';
import { Grid, Paper, Typography, Link } from '@material-ui/core'
import sha256 from "sha256";
import Autocomplete from '@mui/material/Autocomplete';
import MuiPhoneNumber from "material-ui-phone-number";
import { NavBar } from '../components/NavBar';
import { addDoctor } from '../services/CreateApi';
import { useEffect } from "react";
import { getAllHospitals } from '../services/CreateApi';
// const rolesList = [
//     {label: "Primary Docotor", value: "Primary Docotor"},
//     {label: "Secondary Specalist", value: "Secondary Specalist"},
//     {label: "Tertiary Specalist", value: "Tertiary Specalist"}
// ]

const rolesList = ["Primary Doctor", "Secondary Specalist", "Tertiary Specalist"];
const genderList = ["Male", "Female"];

// const hospitalList = [ "Hospital 1","Hospital 2","Hospital 3","Hospital 4","Hospital 5","Hospital 6","Hospital 7","Hospital 8"];

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string('Enter your new password')
        .required('Password is required')
        .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value
        }),
    // phoneNumber: yup
    // regexr.com/6anqd
    // .string().matches(phoneRegex, "Invalid phone").required("Phone is required")
});

export const AddDoctorView = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    // const [hoslist, setHoslist] = useState([]);
    // const getAllHospitals = () => {

    //         axios
    //             .get("/getallHospitals")
    //             .then ((res) => {
    //                 console.log("adsfasdfasdf",res);
    //                 const Hospi = res.data;
    //                 setHoslist(Hospi);    
    //             })
    //             .catch((err) => {
    //                 console.log("error fetching hospitals list");
    //             })
    // }
    // useEffect(() => {
    //     // const interval = setInterval(() => getAllHospitals(), 1000000);
    //     return () => {
    //       getAllHospitals();
    //     };

    //   }, [hoslist]);
    const getHospitalList = () => {
        const hospitalData = JSON.parse(localStorage.getItem("hosList"))

        // console.log(hospitalData)
        //     const hospitalList = localStorage.getItem("hosList");

        //    // hospitalList = hospitalData.((stateInfo) => stateInfo.state === stateName)[0].districts;
        //    console.log(hospitalList);
        //    console.log(rolesList);

        return hospitalData;
    }
    useEffect(() => {
        // var hid1= localStorage.getItem("hid")
        // console.log("this is hid",hid1);
        getAllHospitals();
    }, [])
    const add = (fname, lname, email, hashedPassword, role, gender, hospitalName, phoneNumber, hospitalId) => addDoctor(fname, lname, email, hashedPassword, role, gender, hospitalName, phoneNumber, hospitalId, history)(dispatch);

    const formik = useFormik({
        initialValues: {
            fname: '',
            lname: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: '',
            gender: '',
            hospitalName: '',
            phoneNumber: '',
            hospitalId: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("^^^^^^^^^^^^^^^^^ add doctor submit = ", values)
            var w = values.hospitalName;
            var nameArr = w.split(',');
            // console.log(nameArr);
            var i = nameArr[0];
            var idArr = i.split(/(\s+)/).filter(function (e) { return e.trim().length > 0; });
            idArr[0] = idArr[0].slice(0, -1);
            console.log(idArr);
            // console.log(parseInt(idArr[0]));
            // console.log(idArr[1]);
            add(values.fname, values.lname, values.email, values.confirmPassword, values.role, values.gender, idArr[1], values.phoneNumber, parseInt(idArr[0]));
        },
    });
    const [role, setRole] = useState(rolesList[0]);
    const [gender, setGender] = useState(genderList[0])
    const [hospitalName, setHospitalName] = useState({})
    const paperStyle = { padding: 30, height: '90vh', width: 610, margin: "50px auto" };
    const btnstyle = { margin: '30px 0', align: 'center' };
    const textstyle = { margin: '15px 0' };
    const changeRole = (event, value) => {
        formik.values.role = value;
        setRole(value);
    }
    const changeGender = (event, value) => {
        formik.values.gender = value;
        setGender(value);
    }
    const changeHospitalName = (event, value) => {
        formik.values.hospitalName = value;
        setHospitalName(value);
    }
    const handlePhoneNumberChange = (value) => {
        formik.values.phoneNumber = value;
    }
    return (
        <div>
            <NavBar></NavBar>
            <form onSubmit={formik.handleSubmit}>
                <Paper elevation={10} style={paperStyle}>
                    <Grid container spacing={2}>
                        <Grid align='center' item xs={12} sm={12}>
                            <h2>Add a doctor</h2>
                        </Grid>

                        <Grid item md={1} lg={6}>
                            <TextField
                                required
                                id="fname"
                                name="fname"
                                label="First Name"
                                style={textstyle}
                                value={formik.values.fname}
                                onChange={formik.handleChange}
                                error={formik.touched.fname && Boolean(formik.errors.fname)}
                                helperText={formik.touched.fname && formik.errors.fname}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} lg={6} >
                            <TextField
                                required
                                id="lname"
                                name="lname"
                                label="Last Name"
                                style={textstyle}
                                value={formik.values.lname}
                                onChange={formik.handleChange}
                                error={formik.touched.lname && Boolean(formik.errors.lname)}
                                helperText={formik.touched.lname && formik.errors.lname}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                fullWidth
                                required
                                id="email"
                                name="email"
                                label="Email"
                                style={textstyle}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                fullWidth
                                required
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                style={textstyle}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                fullWidth
                                required
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                style={textstyle}
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <Autocomplete
                                disablePortal
                                id="roles"
                                options={rolesList}
                                openOnFocus
                                autoHighlight
                                onChange={changeRole}
                                renderInput={(params) => <TextField {...params} required
                                    name="role"
                                    label="Role" variant="outlined" />}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <Autocomplete
                                disablePortal
                                openOnFocus
                                id="gender"
                                options={genderList}
                                autoHighlight
                                onChange={changeGender}
                                renderInput={(params) => <TextField {...params} required
                                    label="Gender" name="gender" variant="outlined" />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                disablePortal
                                openOnFocus
                                id="hospitalName"
                                options={getHospitalList()}
                                autoHighlight
                                onChange={changeHospitalName}
                                renderInput={(params) => <TextField {...params} required
                                    label="Hospital Name" name="hospitalName" variant="outlined" />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <MuiPhoneNumber
                                name="phoneNumber"
                                label="Phone Number"
                                defaultCountry={"in"}
                                onChange={handlePhoneNumberChange}
                                value={formik.values.phoneNumber}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} align='center'>
                            <Button align="center" color="primary" variant="contained" type="submit" style={btnstyle} >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>

                </Paper>
            </form>
        </div>
    );
};