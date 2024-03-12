// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import { connect } from "react-redux";
import { setSelectedChat } from "../../../../../../reducers/chatActions";
import MessageAPI from "../../../../../apis/MessageAPI";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import ConnectChatAPI from "../../../../../apis/ConnectChatAPI";
import { Client } from "@stomp/stompjs";
import { v4 as uuidv4 } from "uuid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import IncidentCategoryAPI from "../../../../../apis/IncidentCategoryAPI";
import HelperIncidentAPI from "../../../../../apis/HelperIncidentAPI";
function ChatContent() {
  const [openAssignCategoryModal, setOpenAssignCategoryModal] = useState(false);
  const [selectedIncidentCategory, setSelectedIncidentCategory] = useState("");

  const MySwal = withReactContent(Swal);
  const [messagesReceived, setMessagesReceived] = useState<any[]>([]);
  const [stompClient, setStompClient] = useState<Client | undefined>();
  const [chat, setChat] = useState([]);
  const [chatTemp, setChatTemp] = useState([]);
  const [msg, setMsg] = useState("");
  const [isControlChecked, setIsControlChecked] = useState(false);

  const [assignedCategory, setAssignedCategory] = useState("");

  const selectedChat = useSelector((state) => state.chat.selectedChat);

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [incidentCategoriesOption, setIncidentCategoriesOption] = useState([]);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuOption = (option) => {
    if (option === "Assign Category Help") {
      // Handle Assign Category logic
      handleAssignCategoryOpen();
    } else if (option === "End the Chat") {
      MySwal.fire({
        title: "Are you sure?",
        text: "This will end the chat with the user.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, end the chat!",
        cancelButtonText: "No, cancel!",
      }).then((result) => {
        if (result.isConfirmed) {
          ConnectChatAPI.endChatByUser(selectedChat)
            .then((response) => {
              console.log("End chat response: ", response);
              // setSelectedChat("");
              setChat([]);
            })
            .catch((error) => {
              console.error("Error ending chat: ", error);
            });
        }
      });
    }

    handleMenuClose();
  };

  // useEffect(() => {
  //   if (!stompClient) {
  //     // Create the Stomp client and set up the subscriptions
  //     const stompClient = new Client({
  //       brokerURL: "ws://localhost:8080/ws",
  //       reconnectDelay: 5000,
  //       heartbeatIncoming: 4000,
  //       heartbeatOutgoing: 4000,
  //     });

  //     stompClient.onConnect = () => {
  //       stompClient.subscribe("/topic/admin", (data) => {
  //         console.log("Received message:", data.body);
  //         const message = JSON.parse(data.body);
  //         addMessageToChat(message.text);
  //         scrollToBottom();
  //       });

  //       stompClient.subscribe(
  //         `/topic/${selectedChat}/queue/inboxmessages`,
  //         (data) => {
  //           alert("Received message from user:" + data.body);
  //         }
  //       );
  //     };

  //     stompClient.activate();
  //     setStompClient(stompClient);
  //   }
  // }, [stompClient, selectedChat]);

  const setupStompClient = () => {
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      stompClient.subscribe("/topic/admin", (data) => {
        console.log("Received message:", data.body);
        const message = JSON.parse(data.body);
        addMessageToChat(message.text);
        scrollToBottom();
      });

      stompClient.subscribe(`/topic/${selectedChat}`, (data) => {
        // alert("Received message from user:" + data.body);
      });
    };

    stompClient.activate();
    setStompClient(stompClient);
  };

  const addMessageToChat = (message: any) => {
    // alert("New message !");
    setChat((prevChat) => [
      ...prevChat,
      {
        key: prevChat.length + 1,
        image: "/images/admin.jpg",
        type: "other",
        msg: message,
      },
    ]);
  };

  if (!stompClient) {
    // alert(stompClient);
    setupStompClient();
    // alert("Setting up stomp client");
  }

  const sendMessage = (newMessage: any) => {
    const payload = { id: uuidv4(), text: newMessage };
    // alert("Sending message to user: " + selectedChat);
    stompClient?.publish({
      destination: `/topic/${selectedChat}`,
      body: JSON.stringify(payload),
    });
  };

  const messagesEndRef = useRef(null);

  const handleAssignCategoryOpen = () => {
    setOpenAssignCategoryModal(true);
  };

  const handleAssignCategoryClose = () => {
    setOpenAssignCategoryModal(false);
  };

  const handleAssignCategorySubmit = () => {
    // Handle the submission logic, e.g., call an API to assign the category
    HelperIncidentAPI.assignHelp(selectedChat, selectedIncidentCategory)
      .then((response) => {
        console.log("Assigned category response:", response);
        const categoryName = response?.incidentCategory?.name || "";
        setAssignedCategory(categoryName);
      })
      .catch((error) => {
        console.error("Error assigning category:", error);
        // Handle the error as needed
      });
    // Close the modal
    handleAssignCategoryClose();
  };

  const handleControlChange = () => {
    setIsControlChecked(!isControlChecked);
    const username = selectedChat;

    const updateConnectionType = isControlChecked
      ? ConnectChatAPI.updateTypeConnectionAdmin
      : ConnectChatAPI.updateTypeConnectionOpenAI;

    updateConnectionType(username)
      .then((response) => {
        console.log(
          `updateTypeConnection${
            isControlChecked ? "Admin" : "OpenAI"
          } response: `,
          response
        );
      })
      .catch((error) => {
        console.error(
          `Error updating connection type to ${
            isControlChecked ? "Admin" : "OpenAI"
          }: `,
          error
        );
      });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 13) {
        if (msg !== "") {
          const newMessage = {
            key: chat.length + 1,
            type: "",
            msg: msg,
            image: "/images/admin.jpg",
          };

          MessageAPI.sendMessageAdmin(selectedChat, msg).then((response) => {
            sendMessage(msg);
            setChat((prevChat) => [...prevChat, newMessage]);
            scrollToBottom();
            setMsg("");
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [msg]);

  async function fetchIncidentCategories() {
    try {
      const incidentCategoriesResponse =
        await IncidentCategoryAPI.getIncidentCategories();
      setIncidentCategoriesOption(incidentCategoriesResponse);
    } catch (error) {
      console.error("Error fetching incident categories:", error);
    }
  }

  useEffect(() => {
    fetchIncidentCategories();
    console.log("Selected chat value:", selectedChat);
    if (selectedChat === "") {
      setChat([]);
    } else {
      MessageAPI.getChat(selectedChat).then((data) => {
        console.log("Messages: ", data);
        const updatedChat = data.map((item, index) => ({
          key: index + 1,
          image: "/images/admin.jpg",
          type:
            item.statusMsg === "OPENAI" || item.statusMsg === "ADMIN"
              ? ""
              : "other",
          msg: item.message,
        }));

        setChat(updatedChat);
        scrollToBottom();
      });

      HelperIncidentAPI.getIncidentAssigned(selectedChat)
        .then((response) => {
          console.log("Incident assigned response: ", response);
          setAssignedCategory(response);
        })
        .catch((error) => {
          console.error("Error getting incident assigned: ", error);
        });
    }
  }, [selectedChat]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const onStateChange = (e) => {
    setMsg(e.target.value);
  };

  return (
    <div className="main__chatcontent">
      <Dialog
        open={openAssignCategoryModal}
        onClose={handleAssignCategoryClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Assign Category</DialogTitle>
        <DialogContent>
          <Select
            value={selectedIncidentCategory}
            onChange={(e) => setSelectedIncidentCategory(e.target.value)}
            label="Incident Category"
            fullWidth
          >
            {incidentCategoriesOption.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ backgroundColor: "#ae6d68c2", color: "#fff" }}
            onClick={handleAssignCategoryClose}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#ae6d68", color: "#fff" }}
            onClick={handleAssignCategorySubmit}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar isOnline="active" image="/images/admin.jpg" />

            <p>{selectedChat}</p>
            <FormControlLabel
              className="float-right"
              control={
                <Switch
                  checked={isControlChecked}
                  onChange={handleControlChange}
                />
              }
              label="Bot AI"
              style={{ marginLeft: "auto" }}
            />

            <p className="bg-[#ae6d68] text-white rounded-xl px-2">
              {assignedCategory}
            </p>

            <MoreVertIcon
              className="more-vert-icon cursor-pointer"
              onClick={handleMenuOpen}
            />
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => handleMenuOption("Assign Category Help")}
              >
                Assign Category Help
              </MenuItem>
              <MenuItem onClick={() => handleMenuOption("End the Chat")}>
                End the Chat
              </MenuItem>
            </Menu>
          </div>
        </div>

        <div className="blocks">
          <div className="settings">
            <button className="btn-nobg">
              <i className="fa fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="content__body">
        <div className="chat__items">
          {chat.map((itm, index) => (
            <ChatItem
              animationDelay={index + 2}
              key={itm.key}
              user={itm.type ? itm.type : "me"}
              msg={itm.msg}
              image={itm.image}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles">
            <i className="fa fa-plus"></i>
          </button>
          <input
            type="text"
            placeholder="Type a message here"
            onChange={onStateChange}
            value={msg}
          />
          <button className="btnSendMsg" id="sendMsgBtn">
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatContent;
