import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { MenuItem, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import update from "immutability-helper";
import * as yup from "yup";
import "react-phone-input-2/lib/style.css";
import { NavBar } from "../components/NavBar";
import { useHistory } from 'react-router-dom';

const formSchema = yup.object().shape({
  consultationDate: yup.date().required(),
  complaint: yup.string().required(),
  examination: yup.string().required(),
  illnessSummary: yup.string().required(),
  diagnosisType: yup.string().required(),
  icdDescription: yup.string().required(),
  icd10Code: yup.string().required(),
  improvementStatus: yup.string().required(),
  treatmentInstructions: yup.string().required(),
  remarks: yup.string().required(),
  referral: yup.string(),
  moveToIP: yup.string(),
  reviewSos: yup.string(),
});

const tempDate = new Date();
const currentDate = tempDate.toISOString().substring(0, 10);

const Medicines = {
  medicineName: "",
  dosage: "",
  dosingTime: "",
  duration: "",
};
const Consultation = (props) => {

  // console.log(props.questions)
  let questions = props.questions.map((element) => {
    return {
      question: element,
      response: false,
    };
  });
  // console.log(questions)
  
  const [responseList, setResponseList] = useState(questions);

  const handleQButton = (e, key) => {
    // const { response } = e.target;
    // let newObject = { question: data, response: response === "yes" };
    // setResponseList([...responseList, newObject]);

    let newState = [...responseList];
    // let newObject = newState[key];
    console.log(responseList);

    // newState[key].response = e.target.value === "yes";
    setResponseList(newState);

    console.log(e.target.value);
  };

  let history = useHistory();
  const defaultValues = {
    consultationDate: currentDate,
    complaint: "",
    examination: "",
    illnessSummary: "",
    diagnosisType: "",
    icdDescription: "",
    icd10Code: "",
    improvementStatus: "",
    treatmentInstructions: "",
    remarks: "",
    followUpDate: "",
    referral: "",
    patient: props.patient,
    moveToIP: false,
    reviewSos: false,
    // Consultation_List (List of Prior Consultation Ids)
  };

  const [medicineList, setMedicineList] = useState([Medicines]);

  const handleButton = (e, index) => {
    const { name, value } = e.target;
    const list = [...medicineList];
    list[index][name] = value;
    setMedicineList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...medicineList];
    list.splice(index, 1);
    setMedicineList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setMedicineList([...medicineList, {
      medicineName: "",
      dosage: "",
      dosingTime: "",
      duration: "",
    }]);
  };
  const [errors, setErrors] = useState({
    consultationDate: false,
    complaint: false,
    examination: false,
    illnessSummary: false,
    diagnosisType: false,
    icdDescription: false,
    icd10Code: false,
    improvementStatus: false,
    treatmentInstructions: false,
    remarks: false,
    followUpDate: false,
    referral: false,
  });

  const [formValues, setFormValues] = useState(defaultValues);
  const [questionnaireInUse, setQuestionnaireInUse] = useState(false);


  const [radioValue, setRadioValue] = useState("");

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
    setFormValues({
      ...formValues, moveToIP: (event.target.value === "moveToIP"), reviewSos: (event.target.value === "reviewSOS"),
      followUpDate: (event.target.value !== "followUpDate" ? "" : formValues.followUpDate),
      referral: (event.target.value !== "referral" ? "" : formValues.referral)
    })
  }

  useEffect(() => {
    setFormValues({ ...formValues, medicines: medicineList })
  }, [medicineList])


  useEffect(() => {
    props.view ? setFormValues(props.values) : setFormValues(formValues);
    props.view ? setRadioValue(props.values.reviewSos ? "reviewSOS" : props.values.moveToIP ? "moveToIP" : "") : setRadioValue("")
    props.view ? setMedicineList(props.values.medicines) : setMedicineList(medicineList);
  }, [props.view, props.values]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: false,
    });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = React.useCallback(
    async (event) => {
      // Prevent form from submitting:
      event.preventDefault();
      // Check the schema if form is valid:
      const isFormValid = await formSchema.isValid(formValues, {
        abortEarly: false, // Prevent aborting validation after first error
      });
      if (isFormValid) {
        console.log("in")

        console.log(formValues);
        // props.add(formValues);
      } else {
        formSchema.validate(formValues, { abortEarly: false }).catch((err) => {
          const errors = err.inner.reduce((acc, error) => {
            console.log(error)
            return {
              ...acc,
              [error.path]: true,
            };
          }, {});
          setErrors((prevErrors) =>
            update(prevErrors, {
              $set: errors,
            })
          );
        });
      }
    },
    [formValues]
  );

  const goBack = () => {
    return history.goBack()
  }
  const pastHistory = () => {
    return history.push("/viewPastConsultations/"+props.patient.id);
  }
  const viewPatient = () => {
      return history.push("/viewPatient/"+props.patient.id);
    }
  return (
    <>
      <NavBar></NavBar>
      {
      questionnaireInUse?
      <>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        style={{display:"flex",alignItems:"flex-end",flexDirection:"column",paddingTop:"20px",paddingRight:"20px"}}
       >
          <Grid item xs={12} sm={12} md={12} xl={12} direction="column">
                <Button variant="outlined" color="primary" onClick={() => {setQuestionnaireInUse(false);setFormValues({...formValues, responses: responseList})}}>Go Back</Button>
          </Grid>
        </Grid>
        <Paper
      elevation={10}
      style={{ margin: "20px 5%" }}
      className="page-content"
    >
      <fieldset disabled={props.view}>
        <h1
          style={{ textAlign: "center", marginTop: "10px" }}
          className="heading"
        >
          {"Common Questionnaire"}
        </h1>
        <form>
          <div style={{ maxWidth: "80%", margin: "auto" }}>
            <Grid
              container
              spacing={3}
              // direction="column"
              alignItems="center"
              justifyContent="center"
            >
              {props.questions.map((data, key) => {
                return (
                  <>
                    <Grid item xs={9} sm={9} md={9} xl={9}>
                      <h3>{data.question}</h3>
                    </Grid>
                    <Grid>
                      <FormControl>
                        <FormLabel id="response"></FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="response"
                          name="response"
                          defaultValue="top"
                          onChange={(e) => handleQButton(e, key)}
                        >
                          <FormControlLabel
                            value="yes"
                            control={<Radio />}
                            label="Yes"
                            labelPlacement="top"
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio />}
                            label="No"
                            labelPlacement="top"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </>
                );
              })}
            </Grid>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "400px",
                margin: "50px auto",
              }}
            >
              <Button
                style={{ width: "200px" }}
                variant="contained"
                color="primary"
                type="submit"
                onClick={()=>{setQuestionnaireInUse(false);setFormValues({...formValues, responses: responseList})}}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </fieldset>
    </Paper>
      </>:
      <Paper
        elevation={10}
        style={{ margin: "5vh 10%", width: "80%" }}
        className="page-content"
      >
        <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        style={{display:"flex",alignItems:"flex-end",flexDirection:"column", paddingRight:"20px"}}
       >
          <Grid item xs={12} sm={12} md={12} xl={12} direction="column">
                <Button variant="outlined" color="primary" onClick={() => {setQuestionnaireInUse(true);setResponseList(questions)}}>Questionnaire</Button>
          </Grid>
        </Grid>
        <fieldset style={{border:"none"}} disabled={props.view}>
          <h2
            style={{ textAlign: "center", marginTop: "5px" }}
            className="heading"
          >
            {props.view ? "Consultation Details" : "Add Consultation Details"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ maxWidth: "95%", margin: "auto" }}>
              <Grid
                container
                spacing={3}
                // direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                  <TextField
                    variant="outlined"
                    id="date"
                    name="consultationDate"
                    label="Date of Consulting"
                    type="date"
                    value={formValues.consultationDate}
                    style={{ width: "100%" }}
                    sx={{ width: 220 }}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={errors.consultationDate}
                    helperText={
                      errors.consultationDate ? "Date of Consultation is required" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                  <TextField
                    variant="outlined"
                    id="Complaint"
                    name="complaint"
                    label="Complaint"
                    type="text"
                    style={{ width: "100%" }}
                    // variant="outlined"
                    value={formValues.complaint}
                    onChange={handleInputChange}
                    error={errors.complaint}
                    helperText={errors.complaint ? "Complaint is required" : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                  <TextField
                    variant="outlined"
                    id="Examination"
                    name="examination"
                    label="Examination"
                    type="text"
                    style={{ width: "100%" }}
                    value={formValues.examination}
                    onChange={handleInputChange}
                    error={errors.examination}
                    helperText={
                      errors.examination ? "Examination is required" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                  <TextField
                    variant="outlined"
                    id="IllnessSummary"
                    name="illnessSummary"
                    label="Illness Summary"
                    type="text"
                    style={{ width: "100%" }}
                    value={formValues.illnessSummary}
                    onChange={handleInputChange}
                    error={errors.illnessSummary}
                    helperText={
                      errors.illnessSummary ? "Illness Summary is required" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                  <TextField
                    variant="outlined"
                    id="DiagnosisType"
                    name="diagnosisType"
                    label="Diagnosis Type"
                    type="text"
                    select
                    InputProps={{ readOnly: props.view }}
                    style={{ width: "100%" }}
                    value={formValues.diagnosisType}
                    onChange={handleInputChange}
                    error={errors.diagnosisType}
                    helperText={
                      errors.diagnosisType ? "Diagnosis Type is required" : ""
                    }
                  >
                    <MenuItem value="Differential">Differential</MenuItem>
                    <MenuItem value="Provisional">Provisional</MenuItem>
                    <MenuItem value="Tentative">Tentative</MenuItem>
                    <MenuItem value="Final">Final</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                  <TextField
                    variant="outlined"
                    id="icdDescription"
                    name="icdDescription"
                    label="ICD Description"
                    type="text"
                    style={{ width: "100%" }}
                    value={formValues.icdDescription}
                    onChange={handleInputChange}
                    error={errors.icdDescription}
                    helperText={
                      errors.icdDescription ? "ICD Description is required" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                  <TextField
                    variant="outlined"
                    id="icd10Code"
                    name="icd10Code"
                    label="ICD 10 Code"
                    type="text"
                    style={{ width: "100%" }}
                    value={formValues.icd10Code}
                    onChange={handleInputChange}
                    error={errors.icd10Code}
                    helperText={errors.icd10Code ? "ICD 10 Code is required" : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                  <TextField
                    variant="outlined"
                    id="ImprovementStatus"
                    name="improvementStatus"
                    label="Improvement Status"
                    type="text"
                    select
                    InputProps={{ readOnly: props.view }}
                    style={{ width: "100%" }}
                    value={formValues.improvementStatus}
                    onChange={handleInputChange}
                    error={errors.improvementStatus}
                    helperText={
                      errors.improvementStatus
                        ? "Improvement Status is required"
                        : ""
                    }
                  >
                    <MenuItem value="Condition Improved">Condition Improved</MenuItem>
                    <MenuItem value="Condition Worsened">Condition Worsened</MenuItem>
                    <MenuItem value="Condition Unchanged">Condition Unchanged</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12} xl={12}>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <h3 style={{ textAlign: "left", marginTop: "5px", marginRight: "15px" }}>
                      Medicines
                    </h3>
                    {/* medicineList.length - 1 === i && why we have to use this? and don't remove this line*/}
                    { props.view?<></>:
                      <Button
                        onClick={handleAddClick}
                        style={{ width: "30px" }}
                        variant="contained"
                        color="primary"
                      // type="submit"x
                      >
                        Add
                      </Button>
                    }
                  </div>
                  {medicineList.map((x, i) => {
                    return (

                      <Grid
                        container
                        spacing={3}
                        // direction="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item xs={12} sm={6} md={6} xl={3} direction="column" >
                          <TextField
                            name="medicineName"
                            label="Medicine Name"
                            value={x.medicineName}
                            style={{ width: "100%" }}
                            onChange={(e) => handleButton(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} xl={3} direction="column" >
                          <TextField
                            name="dosage"
                            label="Dosage"
                            value={x.dosage}
                            style={{ width: "100%" }}
                            onChange={(e) => handleButton(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} xl={3} direction="column" >
                          <TextField
                            name="dosingTime"
                            label="Dosing Time"
                            value={x.dosingTime}
                            style={{ width: "100%" }}
                            onChange={(e) => handleButton(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} xl={3} direction="column" >
                          <TextField
                            name="duration"
                            label="Duration"
                            value={x.duration}
                            style={{ width: "100%" }}
                            onChange={(e) => handleButton(e, i)}
                          />
                        </Grid>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            margin: "20px 0px 20px 20px",
                          }}
                        >
                          {medicineList.length !== 1 && (
                            props.view?<></>:<Button
                              onClick={() => handleRemoveClick(i)}
                              style={{ width: "100px" }}
                              variant="contained"
                              color="primary"
                            // type="submit"
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>
                <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                  <TextField
                    variant="outlined"
                    id="Treatment Instructions"
                    name="treatmentInstructions"
                    label="Treatment Instructions"
                    style={{ width: "100%" }}
                    value={formValues.treatmentInstructions}
                    onChange={handleInputChange}
                    error={errors.treatmentInstructions}
                    helperText={
                      errors.treatmentInstructions
                        ? "Treatment Instruction is required"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                  <TextField
                    variant="outlined"
                    id="Remarks"
                    name="remarks"
                    label="Remarks"
                    type="text"
                    style={{ width: "100%" }}
                    value={formValues.remarks}
                    onChange={handleInputChange}
                    error={errors.remarks}
                    helperText={errors.remarks ? "Remarks are required" : ""}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} xl={12}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="next-steps"
                    value={radioValue}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel value="moveToIP" control={<Radio />} label="Move To IP" />
                    <FormControlLabel value="reviewSOS" control={<Radio />} label="Review SOS" />
                    <FormControlLabel value="referral" control={<Radio />} label="Referral" />
                    <FormControlLabel value="followUpDate" control={<Radio />} label="Follow Up Date" />
                  </RadioGroup>
                </Grid>
                {(radioValue === "followUpDate") &&
                  <Grid item xs={12} sm={6} md={6} xl={4} direction="column">
                    <TextField
                      variant="outlined"
                      id="followUpDate"
                      name="followUpDate"
                      label="Follow Up"
                      type="date"
                      style={{ width: "100%" }}
                      value={formValues.followUpDate}
                      onChange={handleInputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={errors.followUpDate}
                      helperText={errors.followUpDate ? "Follow Up is required" : ""}
                    /></Grid>}
                {(radioValue === "referral") &&
                  <Grid item xs={12} sm={6} md={6} xl={4}>
                    <TextField
                      variant="outlined"
                      id="referral"
                      name="referral"
                      label="Referral"
                      value={formValues.referral}
                      onChange={handleInputChange}
                      style={{ width: "100%" }}
                      error={errors.referral}
                      helperText={errors.referral ? "Referral is required" : ""}
                    ></TextField>
                  </Grid>}


              </Grid>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  maxWidth: "400px",
                  margin: "20px auto",
                }}
              >
                <Button
                  style={props.view ? { display: "none" } : { width: "200px" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </fieldset>
        <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        style={{paddingBottom:"10px",marginTop:"-30px", paddingLeft:"20px"}}
       >
        <Grid item xs={12} sm={4} md={4} xl={4} direction="column">
              <Button variant="outlined" color="primary" onClick={() => goBack()}>Go Back</Button>
        </Grid>
         <Grid item xs={12} sm={4} md={4} xl={4} direction="column">
              <Button variant="outlined" color="primary" onClick={() => viewPatient()}>View Patient Details</Button>
        </Grid>
        <Grid item xs={12} sm={4} md={4} xl={4} direction="column">
              <Button variant="outlined" color="primary" onClick={() => pastHistory()}>View Patient History</Button>
        </Grid>
      </Grid>
      </Paper>
    }
    </>
  );
};
export default Consultation;
