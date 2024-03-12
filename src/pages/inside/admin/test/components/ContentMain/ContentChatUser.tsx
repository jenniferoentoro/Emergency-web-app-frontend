// @ts-nocheck
import "./ContentMain.css";
import "bootstrap/dist/css/bootstrap.css";
import OpenAIChatAPI from "../../../../../../apis/OpenAIChatAPI";
import MessageAPI from "../../../../../../apis/MessageAPI";
import ConnectChatAPI from "../../../../../../apis/ConnectChatAPI";
import UserAPI from "../../../../../../apis/UserAPI";
import { useSelector } from "react-redux";
import "./ChatPage.css";
import { Client } from "@stomp/stompjs";
import { v4 as uuidv4 } from "uuid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import React, { useState, useEffect } from "react";
import HelperIncidentAPI from "../../../../../../apis/HelperIncidentAPI";
import "./ChatPage.css";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
const center = { lat: 48.8584, lng: 2.2945 };
const ContentChatUser = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState<Client | undefined>();

  const [helpDetail, setHelpDetail] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [userLatitude, setUserLatitude] = useState(null);

  const [addressHelpDetail, setAddressHelpDetail] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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
  if (
    userLatitude !== null &&
    userLongitude !== null &&
    helperLatitude !== null &&
    helperLongitude !== null
  ) {
    calculateRoute();
  }
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

  const handleMapLoad = (map) => {
    setMap(map);

    // Render marker and directions once the map is loaded
    if (userLatitude !== null && userLongitude !== null) {
      const marker = new window.google.maps.Marker({
        position: { lat: userLatitude, lng: userLongitude },
        map: map,
      });

      if (directionsResponse) {
        const directionsRenderer = new window.google.maps.DirectionsRenderer({
          map: map,
          directions: directionsResponse,
        });
      }
    }
  };

  const handleTrackButtonClick = () => {
    // Open the dialog
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    // Close the dialog
    setOpenDialog(false);
  };

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

  useEffect(() => {
    setMessages([
      {
        name: "ADMIN",
        img: "./images/admin.jpg",
        side: "left",
        text: "Hello, how can I help you?",
        time: formatDate(new Date()),
      },
    ]);

    const fetchData = async () => {
      try {
        // Check if helpDetail is already fetched
        const existingHelpDetail = await HelperIncidentAPI.getByUser();
        if (existingHelpDetail) {
          setHelpDetail(existingHelpDetail);
          const address = await fetchLocation(
            existingHelpDetail.latitude,
            existingHelpDetail.longitude
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

          calculateRoute();
          console.log("Help detail:", existingHelpDetail);
        }
      } catch (error) {
        console.error("Error fetching helps:", error);
      }
    };

    fetchData();
  }, []);

  const [username, setUsername] = useState("");
  function fetchUserDetails() {
    UserAPI.getMySelf()
      .then(async (userDetailsResponse) => {
        setUserDetails(userDetailsResponse);

        const username = userDetailsResponse.username;
        console.log("Username: " + username);

        setUsername(username);
        // alert("Username: " + username);
        if (!stompClient && username) {
          setupStompClient(username);
        }

        if (username !== "") {
          try {
            const fetchedMessages = await MessageAPI.getChat(username);
            console.log("Fetched messages:", fetchedMessages);
            if (fetchedMessages.length > 0) {
              const formattedMessages = fetchedMessages.map((msg) => ({
                name: msg.statusMsg === "ADMIN" ? "ADMIN" : "User",
                img: "./images/admin.jpg", // Assuming the same image for both admin and user
                side: msg.statusMsg === "ADMIN" ? "left" : "right",
                text: msg.message,
                time: formatDate(new Date()),
              }));

              setMessages((prevMessages) => [
                ...prevMessages,
                ...formattedMessages,
              ]);
            }
          } catch (error) {
            console.error("Error fetching messages:", error);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        window.location.href = "/login";
      });
  }

  const setupStompClient = (username) => {
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      stompClient.subscribe(`/topic/${username}`, (data) => {
        console.log("Received message from user:" + JSON.parse(data.body).text);
        const message = JSON.parse(data.body).text;
        const newMessage = {
          name: "ADMIN",
          img: "./images/admin.jpg",
          side: "left",
          text: message,
          time: formatDate(new Date()),
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    };

    stompClient.activate();
    setStompClient(stompClient);
  };

  const [counter, setCounter] = useState(0);
  if (!stompClient && counter === 0) {
    fetchUserDetails();
    setCounter(1);
  }

  const msgerFormSubmitHandler = (event: React.FormEvent, username) => {
    event.preventDefault();
    const msgerInput = document.querySelector(
      ".msger-input"
    ) as HTMLInputElement;
    const msgText = msgerInput.value;
    if (!msgText) return;

    // alert("Username: " + username);
    console.log("Username: " + username);
    const newMessage = {
      name: username,
      img: "./images/admin.jpg",
      side: "right",
      text: msgText,
      time: formatDate(new Date()),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    msgerInput.value = "";

    ConnectChatAPI.getOngoing().then((response) => {
      console.log("Ongoing chat:", response);

      if (response === "OPENAI") {
        console.log("OpenAI chat");
        OpenAIChatAPI.getChatResponse(msgText)
          .then((response) => {
            console.log("Chat response:", response);
            const newMessageResponse = {
              name: "ADMIN",
              img: "./images/admin.jpg",
              side: "left",
              text: response,
              time: formatDate(new Date()),
            };
            setMessages((prevMessages) => [
              ...prevMessages,
              newMessageResponse,
            ]);
            // setMessageInput("");
          })
          .catch((error) => {
            console.error("API request error:", error);
          });
      } else {
        sendMessage(msgText);
      }
    });
  };

  const sendMessage = (newMessage: any) => {
    const payload = { id: uuidv4(), text: newMessage };
    stompClient?.publish({
      destination: "/topic/admin",
      body: JSON.stringify(payload),
    });

    MessageAPI.sendChat(newMessage).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    const msgerForm = document.querySelector(
      ".msger-inputarea"
    ) as HTMLFormElement;

    const handleSubmit = (event: React.FormEvent) => {
      msgerFormSubmitHandler(event, username);
    };

    msgerForm.addEventListener("submit", handleSubmit);

    return () => {
      msgerForm.removeEventListener("submit", handleSubmit);
    };
  }, [username]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    const msgerChat = document.querySelector(".msger-chat") as HTMLElement;
    msgerChat.scrollTop = msgerChat.scrollHeight;
  }, [messages]);

  function appendMessage(name, img, side, text, time) {
    const newMessage = {
      name,
      img,
      side,
      text,
      time,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }

  function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
  }
  return (
    <section className="msger">
      <header className="msger-header">
        <div className="msger-header-title">
          <i className="fas fa-comment-alt"></i> Dutch Crisis Support
        </div>
        <div className="msger-header-options">
          {helpDetail && (
            <Button
              onClick={handleTrackButtonClick}
              variant="contained"
              color="primary"
            >
              Track
            </Button>
          )}
          <span>
            <i className="fas fa-cog"></i>
          </span>
        </div>
      </header>

      <main className="msger-chat">
        {messages.map((msg, index) => (
          <div key={index} className={`msg ${msg.side}-msg`}>
            <div
              className="msg-img"
              style={{ backgroundImage: `url(${msg.img})` }}
            ></div>

            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">{msg.name}</div>
                <div className="msg-info-time">{msg.time}</div>
              </div>

              <div className="msg-text">{msg.text}</div>
            </div>
          </div>
        ))}
      </main>

      <form className="msger-inputarea">
        <input
          type="text"
          className="msger-input"
          placeholder="Enter your message..."
        />
        <button type="submit" className="msger-send-btn">
          Send
        </button>
      </form>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <b>Track Helper</b>

          <p>
            {" "}
            {distance} ({duration} away)
          </p>
        </DialogTitle>
        <DialogContent>
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
            onLoad={handleMapLoad} // Use onLoad callback to handle map loading
          >
            {/* No need to render Marker and DirectionsRenderer here */}
          </GoogleMap>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default ContentChatUser;
