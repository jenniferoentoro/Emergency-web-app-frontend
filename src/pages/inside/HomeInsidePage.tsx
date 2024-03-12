// @ts-nocheck
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserAPI from "../../apis/UserAPI";
import NavbarInside from "../../components/inside/navbar/NavbarInside";
import ConnectChatAPI from "../../apis/ConnectChatAPI";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import "animate.css";
function HomeInsidePage() {
  const [userDetails, setUserDetails] = useState(null);
  const [pressCount, setPressCount] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [address, setAddress] = useState("");
  const MySwal = withReactContent(Swal);

  const handleButtonClick = () => {
    if (!timerStarted) {
      setTimerStarted(true);

      setTimeout(() => {
        setPressCount(0);
        setTimerStarted(false);
      }, 3000);
    }

    setPressCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (pressCount === 3) {
      ConnectChatAPI.connectChat(longitude, latitude)
        .then((response) => {
          console.log("Connected to chat:", response);
          window.location.href = "/chatv2";
        })
        .catch((error) => {
          MySwal.fire({
            title: <strong>Confirmation</strong>,
            html: (
              <i>
                You still have chat session. Do you want to go to older chat or
                create new chat?
              </i>
            ),
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Make new chat",
            cancelButtonText: "Go to older chat",
          }).then((result) => {
            if (result.isConfirmed) {
              ConnectChatAPI.reconnectChat(longitude, latitude)
                .then((response) => {
                  console.log("Reconnected to chat:", response);
                  window.location.href = "/chatv2";
                })
                .catch((error) => {
                  console.error("Error reconnecting to chat:", error);
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              window.location.href = "/chatv2";
            }
          });
        });
    }
  }, [pressCount]);

  const [counter, setCounter] = useState(0);

  function location() {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setLatitude(lat);
      setLongitude(lon);

      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

      axios
        .get(url)
        .then((response) => {
          setAddress(response.data.address);
        })
        .catch((error) => {
          console.error("Error fetching location:", error);
        });
    });
  }

  useEffect(() => {
    location();

    async function fetchUserDetails() {
      try {
        const userDetailsResponse = await UserAPI.getMySelf();
        setUserDetails(userDetailsResponse);
      } catch (error) {
        console.error("Error fetching user details:", error);
        window.location.href = "/login";
      }
    }

    fetchUserDetails();
  }, []);

  return (
    <div className="color-background min-h-screen">
      <NavbarInside />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h1 className="text-3xl font-bold text-[#352A20] animate__animated animate__fadeInDown">
              Welcome, {userDetails?.firstName}!
            </h1>
            <p className="text-xl animate__animated animate__fadeIn">
              Your current location is: {address.house_number} {address.road}{" "}
              {address.city} {address.country}
            </p>
            <p className="text-xl animate__animated animate__fadeIn">
              Press the "Emergency" button 3 times within 3 seconds to proceed:
            </p>
            <button
              className="emergencybutton mx-auto my-4 animate__animated animate__bounceIn"
              onClick={handleButtonClick}
            >
              Emergency <br /> Button
            </button>
            <p className="animate__animated animate__fadeIn">
              Press count: {pressCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeInsidePage;
