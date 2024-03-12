// @ts-nocheck
import React, { useState, useEffect } from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import UserAPI from "../../../../../apis/UserAPI";

function ChatList() {
  const [allChats, setAllChats] = useState([]);

  useEffect(() => {
    UserAPI.getUserChatAdmin()
      .then((data) => {
        setAllChats(data);
      })
      .catch((error) => {
        console.error("Error fetching chat users: ", error);
      });
  }, []);

  return (
    <div className="main__chatlist">
      <div className="chatlist__heading">
        <h2>Chats</h2>
        <button className="btn-nobg">
          <i className="fa fa-ellipsis-h"></i>
        </button>
      </div>
      <div className="chatList__search">
        <div className="search_wrap">
          <input type="text" placeholder="Search Here" required />
          <button className="search-btn">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="chatlist__items">
        {allChats.map((item, index) => {
          return (
            <ChatListItems
              name={item.username}
              key={item.id}
              animationDelay={index + 1}
              active=""
              isOnline="active"
              image={"/images/admin.jpg"}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ChatList;
