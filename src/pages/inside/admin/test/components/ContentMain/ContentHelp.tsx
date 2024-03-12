// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import ConnectChatAPI from "../../../../../../apis/ConnectChatAPI";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import axios from "axios";
import HelperIncidentAPI from "../../../../../../apis/HelperIncidentAPI";
import { set } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { Box } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CustomMarkerImage from "../../../../assets/img/mapsMarker.png";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
const center = { lat: 48.8584, lng: 2.2945 };
function ContentHelp() {
  const [helps, setHelps] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [helpDetail, setHelpDetail] = useState(null);
  const [addressHelpDetail, setAddressHelpDetail] = useState(null);
  const MySwal = withReactContent(Swal);

  const [userLongitude, setUserLongitude] = useState(null);
  const [userLatitude, setUserLatitude] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAgXhBnoStoLIpid41L6N7Q_KPBfYsZN1k",
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const [helperLongitude, setHelperLongitude] = useState(null);
  const [helperLatitude, setHelperLatitude] = useState(null);

  // if (!isLoaded) {
  //   return "Loading...";
  // } else {
  //   calculateRoute();
  // }

  async function calculateRoute() {
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: { lat: helperLatitude, lng: helperLongitude },
      destination: { lat: userLatitude, lng: userLongitude },
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if helpDetail is already fetched
        const existingHelpDetail = await HelperIncidentAPI.getByHelp();
        if (existingHelpDetail) {
          setHelpDetail(existingHelpDetail);
          const address = await fetchLocation(
            existingHelpDetail.chatConnection.latitude,
            existingHelpDetail.chatConnection.longitude
          );
          setUserLatitude(
            parseFloat(existingHelpDetail.chatConnection.latitude)
          );
          setUserLongitude(
            parseFloat(existingHelpDetail.chatConnection.longitude)
          );

          setHelperLatitude(parseFloat(existingHelpDetail.latitude));
          setHelperLongitude(parseFloat(existingHelpDetail.longitude));

          setAddressHelpDetail(address);
          console.log("Help detail:", existingHelpDetail);
        } else {
          const response = await ConnectChatAPI.getAllHelperOngoing();
          setHelps(response);

          // Fetch addresses for each help
          const addressPromises = response.map((help) =>
            fetchLocation(help.latitude, help.longitude)
          );
          const resolvedAddresses = await Promise.all(addressPromises);
          setAddresses(resolvedAddresses);
        }
      } catch (error) {
        console.error("Error fetching helps:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Check if both user and helper coordinates are available
    if (
      userLatitude !== null &&
      userLongitude !== null &&
      helperLatitude !== null &&
      helperLongitude !== null
    ) {
      calculateRoute();
    }
  }, [userLatitude, userLongitude, helperLatitude, helperLongitude]);

  const fetchLocation = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    try {
      const response = await axios.get(url);
      return response.data.display_name;
    } catch (error) {
      console.error("Error fetching location:", error);
      return "Location not available";
    }
  };

  const formatBirthDate = (birthDate) => {
    const formattedDate = new Date(birthDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

  const handleEmailClick = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const doneClicked = (id) => {
    MySwal.fire({
      title: "Confirm Assignment",
      text: "Are you sure you helped the user already?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, done!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        HelperIncidentAPI.updateStatusDone(id).then((response) => {
          MySwal.fire({
            icon: "success",
            title: "Done!",
            text: "The help has been successfully done.",
          });
          window.location.reload();
        });
      }
    });
  };

  const handleHelpClick = (help) => {
    MySwal.fire({
      title: "Confirm Assignment",
      text: "Are you sure you want to assign help?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, assign it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setHelperLatitude(parseFloat(lat));
          setHelperLongitude(parseFloat(lon));

          HelperIncidentAPI.assignHelpChoose(help, lon, lat)
            .then(async (response) => {
              console.log("Help assigned:", response);
              MySwal.fire({
                icon: "success",
                title: "Help Assigned!",
                text: "The help has been successfully assigned.",
              });

              setHelpDetail(response);
              setUserLatitude(parseFloat(response.chatConnection.latitude));
              setUserLongitude(parseFloat(response.chatConnection.longitude));

              const address = await fetchLocation(
                response.chatConnection.latitude,
                response.chatConnection.longitude
              );
              setAddressHelpDetail(address);
            })
            .catch((error) => {
              console.error("Error assigning help:", error);
              MySwal.fire({
                icon: "error",
                title: "Error",
                text: "There was an error assigning the help. Please try again.",
              });
            });
        });
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="d-flex align-items-center">
            <h1 className="font-bold">Assign Help</h1>
            <Tooltip title="Click to the user's email to see the details">
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        {helpDetail ? (
          // Render helpDetail details
          <div className="col-lg-10 my-2">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleEmailClick(helpDetail.chatConnection.user)
                    }
                  >
                    <b>{helpDetail.chatConnection.user.email}</b>
                  </h5>
                </div>
                {/* Render details for helpDetail here */}
                <p className="card-text">{addressHelpDetail}</p>

                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-text mt-0">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${userLatitude},${userLongitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3f51b5]"
                    >
                      Open in Google Maps
                    </a>
                  </p>

                  <p className="float-right">
                    {distance} ({duration} away)
                  </p>
                </div>

                <GoogleMap
                  center={center}
                  zoom={15}
                  mapContainerStyle={{ width: "100%", height: "400px" }}
                  options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                  }}
                  onLoad={(map) => setMap(map)}
                >
                  <Marker position={center} />
                  {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
                  )}
                </GoogleMap>

                {/* Centered button */}
                <div className="d-flex justify-content-center mt-2">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => doneClicked(helpDetail.id)}
                  >
                    Done
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Render list of helps
          helps.map((help, index) => (
            <div key={help.id} className="col-lg-10 my-2">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5
                      className="card-title"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEmailClick(help.user)}
                    >
                      <b>{help.user.email}</b>
                    </h5>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleHelpClick(help.id)}
                    >
                      Help
                    </Button>
                  </div>
                  <p className="card-text">{addresses[index]}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <b>User Details</b>
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <div>
              <p>Email: {selectedUser.email}</p>
              <p>First Name: {selectedUser.firstName}</p>
              <p>Last Name: {selectedUser.lastName}</p>{" "}
              <p>Birth Date: {formatBirthDate(selectedUser.birthDate)}</p>
              <p>Address: {selectedUser.address}</p>
              <p>Identity Card Number: {selectedUser.identityCardNumber}</p>
              <p>Phone Number: {selectedUser.phoneNumber}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ContentHelp;
