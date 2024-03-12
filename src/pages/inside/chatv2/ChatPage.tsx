// @ts-nocheck

import NavbarInside from "../../../components/inside/navbar/NavbarInside";
import OpenAIChatAPI from "../../../apis/OpenAIChatAPI";
import MessageAPI from "../../../apis/MessageAPI";
import ConnectChatAPI from "../../../apis/ConnectChatAPI";
import UserAPI from "../../../apis/UserAPI";
import { useSelector } from "react-redux";
import "./ChatPage.css";
import { Client } from "@stomp/stompjs";
import { v4 as uuidv4 } from "uuid";

import React, { useState, useEffect } from "react";
import "./ChatPage.css";

function ChatPageV2() {
  const [userDetails, setUserDetails] = useState(null);
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState<Client | undefined>();

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
  }, []);

  const [username, setUsername] = useState("");
  function fetchUserDetails() {
    UserAPI.getMySelf()
      .then((userDetailsResponse) => {
        setUserDetails(userDetailsResponse);

        const username = userDetailsResponse.username;
        console.log("Username: " + username);

        setUsername(username);
        // alert("Username: " + username);
        if (!stompClient && username) {
          setupStompClient(username);
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
    // <div className="color-background min-h-screen">
    // <NavbarInside>
    //   <div className="container-fluid">
    //     <div className="row justify-content-center">
    //

    <div className="container">
      <div className="row" align="center">
        <section className="msger">
          <header className="msger-header">
            <div className="msger-header-title">
              <i className="fas fa-comment-alt"></i> Dutch Crisis Support
            </div>
            <div className="msger-header-options">
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
        </section>
      </div>
    </div>

    //  </div>
    //         </div>
    //         </NavbarInside>
    //         </div>
  );
}

export default ChatPageV2;
