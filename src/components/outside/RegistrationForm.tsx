import { useState, useEffect } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import AuthAPI from "../../apis/AuthAPI";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import BottomForm from "./BottomForm";

function RegistrationForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    address: "",
    identitycardnumber: "",
    email: "",
    username: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const MySwal = withReactContent(Swal);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [registrationStatus, setRegistrationStatus] = useState(false);

  useEffect(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    const date = `${year}-${month}-${day}`;
    setFormData({
      ...formData,
      birthDate: date,
    });
  }, []);

  useEffect(() => {
    if (registrationStatus === true) {
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const year = today.getFullYear();
      const date = `${year}-${month}-${day}`;
      setFormData({
        username: "",
        confirmPassword: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        identitycardnumber: "",
        address: "",
        birthDate: date,
      });
      setRegistrationStatus(false);

      setActiveStep(0);
    }
  }, [registrationStatus]);

  const handleSubmit = () => {
    const {
      username,

      confirmPassword,
      password,
      email,
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      identitycardnumber,
      address,
    } = formData;

    AuthAPI.register(
      username,
      confirmPassword,
      password,
      email,
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      identitycardnumber,
      address
    )
      .then((response: any) => {
        MySwal.fire({
          title: "Success!",
          text: response,
          icon: "success",
          confirmButtonText: "OK",
        });
        setRegistrationStatus(true);
      })
      .catch((response) => {
        const errors = response.response.data.errors;
        let errorMessage = "";

        if (errors.length > 1) {
          for (const error of errors) {
            if (errors.indexOf(error) === errors.length - 1) {
              errorMessage += error.error;
            } else {
              errorMessage += error.error + ", ";
            }
          }
        } else {
          errorMessage = errors[0].error;
        }

        MySwal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const formSteps = [
    {
      label: "Personal Information",
      fields: [
        { name: "firstName", type: "text" },
        { name: "lastName", type: "text" },
        { name: "birthDate", type: "date" },
        { name: "address", type: "text" },
        { name: "identitycardnumber", type: "text" },
      ],
    },
    {
      label: "Contact Information",
      fields: [
        { name: "email", type: "email" },
        { name: "phoneNumber", type: "tel" },
      ],
    },
    {
      label: "Account Information",
      fields: [
        { name: "username", type: "text" },
        { name: "password", type: "password" },
        { name: "confirmPassword", type: "password" },
      ],
    },
  ];

  return (
    <div className="animate__animated animate__zoomIn relative z-30 rounded-md border-2 border-transparent bg-[#FFFAF4] px-2 shadow-lg py-4">
      <div className="row">
        <div className="col-12">
          <h1 className="font-bold text-xl text-[#a42c24] mb-2">
            BE PART OF DSC!
          </h1>
          <Stepper
            className="w-auto mb-0"
            activeStep={activeStep}
            alternativeLabel
          >
            {formSteps.map((step, index) => (
              <Step key={index}>
                <StepLabel style={{ fontSize: "10px" }}>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-10">
          <div>
            {formSteps[activeStep].fields.map((field) => (
              <TextField
                key={field.name}
                name={field.name}
                label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                variant="standard"
                fullWidth
                margin="normal"
                type={field.type} // Use the specified type from formSteps
                value={formData[field.name as keyof typeof formData]}
                onChange={handleFormChange}
                // required
                className="mb-0"
              />
            ))}
          </div>
          <div className="row justify-content-center">
            <div className="col-12 mt-2">
              <button
                type="button"
                onClick={
                  activeStep === formSteps.length - 1
                    ? handleSubmit
                    : handleNext
                }
                className="rounded-full bg-[#a42c24] text-white px-20 tracking-wider py-2 mt-2"
              >
                {activeStep === formSteps.length - 1 ? "Submit" : "Next"}
              </button>
              {activeStep !== 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="rounded-full bg-[#c9786f] text-white px-20 tracking-wider py-2 mt-2"
                >
                  Back
                </button>
              )}
            </div>
          </div>

          <BottomForm
            title="Already have an account? "
            link="login"
            option="Login"
          />
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
