import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import { v4 as uuidv4 } from "uuid";
import ChatMessagesPlaceholder from "./components/ChatMessagesPlaceHolder";
import SendMessagePlaceholder from "./components/SendMessagePlaceholder";
import UsernamePlaceholder from "./components/UsernamePlaceholder";

function App() {
  const [stompClient, setStompClient] = useState<Client | undefined>();
  const [username, setUsername] = useState<string | undefined>();
  const [messagesReceived, setMessagesReceived] = useState<any[]>([]);

  const setupStompClient = () => {
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      stompClient.subscribe("/topic/publicmessages", (data) => {
        console.log(data);
        onMessageReceived(data);
      });
    };

    stompClient.activate();
    setStompClient(stompClient);
  };

  const sendMessage = (newMessage: any) => {
    const payload = {
      id: uuidv4(),
      text: newMessage.text,
    };
    stompClient?.publish({
      destination: "/topic/publicmessages",
      body: JSON.stringify(payload),
    });
  };

  const onMessageReceived = (data: any) => {
    const message = JSON.parse(data.body);
    setMessagesReceived((messagesReceived) => [...messagesReceived, message]);
  };

  const onUsernameInformed = (username: string) => {
    setUsername(username);
  };

  if (!stompClient) {
    alert(stompClient);
    setupStompClient();
    // alert("Setting up stomp client");
  }

  // useEffect(() => {
  //   setupStompClient();
  //   alert("Setting stomp client");
  // }, []);

  return (
    <div className="App">
      <UsernamePlaceholder
        username={username}
        onUsernameInformed={onUsernameInformed}
      />
      {/* <br></br> */}
      <SendMessagePlaceholder username={username} onMessageSend={sendMessage} />
      {/* <br></br> */}
      <ChatMessagesPlaceholder
        username={username}
        messagesReceived={messagesReceived}
      />
    </div>
  );
}

export default App;
