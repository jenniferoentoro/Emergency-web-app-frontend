import React, { useState } from "react";
import AuthAPI from "../../apis/AuthAPI";
import "animate.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TextField from "@mui/material/TextField";
import BottomForm from "../../components/outside/BottomForm";
import UserAPI from "../../apis/UserAPI";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function LoginPage() {
  const [rotations, setRotations] = useState({
    fire: false,
    firstAid: false,
    helper: false,
    ambulance: false,
  });

  const [transformStyles, setTransformStyles] = useState({
    x: 0,
    y: 0,
  });

  const [transformStylesAmbulance, setTransformStylesAmbulance] = useState({
    x: 0,
    y: 0,
  });

  const { control, handleSubmit } = useForm();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const toggleRotation = (element: keyof typeof rotations) => {
    setRotations({
      ...rotations,
      [element]: !rotations[element],
    });
  };

  const updateTransform = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    const xOffset = (clientX / window.innerWidth - 0.5) * 25;
    const yOffset = (clientY / window.innerHeight - 0.5) * 25;
    const xOffsetA = (clientX / window.innerWidth - 0.5) * 15;
    const yOffsetA = (clientY / window.innerHeight - 0.5) * 15;
    setTransformStyles({ x: xOffset, y: yOffset });
    setTransformStylesAmbulance({ x: xOffsetA, y: yOffsetA });
  };

  const handleApiError = (error: any) => {
    setLoading(false);
    if (error.response && error.response.data && error.response.data.errors) {
      const errors = error.response.data.errors;
      let errorMessage = errors.map((e: any) => e.error).join(", ");
      MySwal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      MySwal.fire({
        title: "Error!",
        text: "An error occurred while logging in",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const onSubmit = async (data: any) => {
    try {
      setLoading(true); // Start the loader
      const { username, password } = data;

      const responseToken = await AuthAPI.login(username, password);

      localStorage.setItem("accessToken", responseToken.token.toString());
      localStorage.setItem(
        "refreshToken",
        responseToken.refreshToken.toString()
      );

      const response = await UserAPI.getMySelf();
      const roles = response.roles.map((role: any) => role.role);
      console.log("User roles:", roles);

      if (roles.includes("USER")) {
        navigate("/home");
      } else if (roles.includes("ADMIN")) {
        navigate("/admin/statistic");
      } else if (roles.includes("HELPER")) {
        navigate("/helper");
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false); // Stop the loader after API call
    }
  };

  return (
    <div onMouseMove={updateTransform}>
      <img
        className={`fire w-16 ${rotations.fire ? "fire30" : "firedefault"}`}
        src="images/fire.png"
        alt=""
        style={{
          transform: `translate(${transformStyles.x}px, ${transformStyles.y}px)`,
        }}
        onMouseMove={() => toggleRotation("fire")}
      />
      <img
        className={`relative z-40 firstaid w-16 ${
          rotations.firstAid ? "firstaid2" : "firstaiddefault"
        }`}
        src="images/firstaid.png"
        alt=""
        onMouseMove={() => toggleRotation("firstAid")}
      />

      <div className="animate__animated animate__zoomIn relative z-30 rounded-md border-2 border-transparent bg-[#FFFAF4] px-8 shadow-lg py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="font-bold text-xl text-[#a42c24]">Welcome back!</h1>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Username"
                variant="standard"
                fullWidth
                margin="normal"
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Password"
                variant="standard"
                fullWidth
                margin="normal"
                type="password"
                {...field}
              />
            )}
          />

          <button
            type="submit"
            className="rounded-full bg-[#a42c24] text-white px-20 tracking-wider py-2 mt-4"
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" /> // Show CircularProgress while loading
            ) : (
              "Login"
            )}
          </button>
        </form>
        <BottomForm
          title="Don't have an account? "
          link="register"
          option="Sign up"
        />
      </div>
      <img
        className={`relative z-40 helper w-24 ${
          rotations.helper ? "helper2" : "helperdefault"
        }`}
        src="images/helper.png"
        alt=""
        onMouseMove={() => toggleRotation("helper")}
      />
      <img
        className={`relative z-40 ambulance float-right w-32 ${
          rotations.ambulance ? "ambulance2" : "ambulancedefault"
        }`}
        src="images/ambulance.png"
        alt=""
        onMouseMove={() => toggleRotation("ambulance")}
        style={{
          transform: `translate(${transformStylesAmbulance.y}px, ${transformStylesAmbulance.x}px)`,
        }}
      />
    </div>
  );
}

export default LoginPage;
