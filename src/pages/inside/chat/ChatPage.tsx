// @ts-nocheck
import React, { useEffect, useState } from "react";
import "./ChatPage.css";
import { Client } from "@stomp/stompjs";
import { v4 as uuidv4 } from "uuid";
import {
  Videocam,
  Phone,
  MoreVert,
  Person,
  People,
  Add,
  Block,
} from "@mui/icons-material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import NavbarInside from "../../../components/inside/navbar/NavbarInside";
import OpenAIChatAPI from "../../../apis/OpenAIChatAPI";
import MessageAPI from "../../../apis/MessageAPI";
import ConnectChatAPI from "../../../apis/ConnectChatAPI";
import UserAPI from "../../../apis/UserAPI";
// import { selectUsername } from "../../../reducers/user/";
import { useSelector } from "react-redux";
function ChatPage() {
  const [userDetails, setUserDetails] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [stompClient, setStompClient] = useState<Client | undefined>();
  const [messagesReceived, setMessagesReceived] = useState<any[]>([]);

  useEffect(() => {
    // alert("Setting up stomp client");
    setMessages(["Hello, how can I help you?"]);

    // fetchUserDetails();
  }, []);

  const [username, setUsername] = useState("");
  function fetchUserDetails() {
    UserAPI.getMySelf()
      .then((userDetailsResponse) => {
        setUserDetails(userDetailsResponse);

        const username = userDetailsResponse.username; // Extract the username
        console.log("Username: " + username); // Log the username

        // alert("Username: " + username); // Log the username
        setUsername(username); // Set the username in the state
        if (!stompClient && username) {
          // alert("Setting up stomp client" + username);
          // alert("yyy");
          setupStompClient(username); // Pass the username to setupStompClient
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
      // stompClient.subscribe("/topic/admin", (data) => {
      //   console.log("Received message:", data.body);
      //   addReceivedMessage(data.body);
      // });
      // alert("Setting up stomp client" + username);

      stompClient.subscribe(`/topic/${username}`, (data) => {
        console.log("Received message from user:" + JSON.parse(data.body).text);
        const message = JSON.parse(data.body).text;
        setMessages((prevMessages) => [
          ...prevMessages,
          message, // You can add a sender property as needed.
        ]);
        // addReceivedMessage(message.text);
      });
    };

    stompClient.activate();
    setStompClient(stompClient);
  };

  const [counter, setCounter] = useState(0);
  if (!stompClient && counter === 0) {
    // alert(stompClient);
    fetchUserDetails();
    setCounter(1);
    // const username = useSelector((state) => state.user.username);
    // alert(username);
    // alert(username);
    // alert(userDetails.username);
    // alert("Setting up stomp client");
    // alert(username);
    // setupStompClient("c14200152");
    // setupStompClient(username);
    // alert("Setting up stomp client");
  }

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        messageInput, // You can add a sender property as needed.
      ]);
      setMessageInput("");
      console.log("Sending message:", messageInput);

      ConnectChatAPI.getOngoing().then((response) => {
        console.log("Ongoing chat:", response);

        if (response === "OPENAI") {
          console.log("OpenAI chat");
          OpenAIChatAPI.getChatResponse(messageInput)
            .then((response) => {
              console.log("Chat response:", response);
              setMessages((prevMessages) => [...prevMessages, response]);
              setMessageInput("");
            })
            .catch((error) => {
              console.error("API request error:", error);
            });
        } else {
          sendMessage(messageInput);
        }
      });
    }
  };

  const addReceivedMessage = (message) => {
    setMessagesReceived((prevMessages) => [...prevMessages, message]);
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

  return (
    <div className="color-background min-h-screen">
      <NavbarInside>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-8 col-xl-6">
              <div className="cardChat">
                <div className="card-header msg_head">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img
                        src="./images/admin.jpg"
                        className="rounded-circle user_img"
                        alt="User"
                      />
                      <span className="online_icon"></span>
                    </div>
                    <div className="user_info">
                      <span>Dutch Crisis Support</span>
                      {/* <p>1767 Messages</p> */}
                    </div>
                    {/* <div className="video_cam">
                  <span>
                    <Videocam />
                  </span>
                  <span>
                    <Phone />
                  </span>
                </div> */}
                  </div>
                  <span id="action_menu_btn">
                    <MoreVert />
                  </span>
                  <div className="action_menu">
                    <ul>
                      <li>
                        <Person />
                      </li>
                      <li>
                        <People />
                      </li>
                      <li>
                        <Add />
                      </li>
                      <li>
                        <Block />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body msg_card_body">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`d-flex justify-content-${
                        index % 2 === 0 ? "start" : "end"
                      } mb-4`}
                    >
                      {index % 2 === 0 ? ( // Profile on the left for even index
                        <>
                          <div className="img_cont_msg">
                            <img
                              src="./images/admin.jpg"
                              className="rounded-circle user_img_msg"
                            />
                          </div>
                          <div
                            className={`msg_cotainer${
                              index % 2 === 0 ? "" : "_send"
                            }`}
                          >
                            {msg}
                            <span className="msg_time">8:55 AM, Today</span>
                          </div>
                        </>
                      ) : (
                        <>
                          {" "}
                          {/* Profile on the right for odd index */}
                          <div
                            className={`msg_cotainer${
                              index % 2 === 0 ? "" : "_send"
                            }`}
                          >
                            {msg}
                            <span className="msg_time_send">
                              8:55 AM, Today
                            </span>
                          </div>
                          <div className="img_cont_msg">
                            <img
                              src="./images/admin.jpg"
                              className="rounded-circle user_img_msg"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="card-footer">
                  <div className="input-group">
                    <div className="input-group-append">
                      <span className="input-group-text attach_btn">
                        <AttachFileIcon />
                      </span>
                    </div>
                    <textarea
                      name=""
                      className="form-control type_msg textareaLine"
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      //   rows="1"
                    ></textarea>
                    <div className="input-group-append">
                      <span
                        className="input-group-text send_btn"
                        onClick={handleSendMessage}
                      >
                        <SendIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NavbarInside>
    </div>
  );
}

export default ChatPage;
