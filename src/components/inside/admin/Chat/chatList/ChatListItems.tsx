// @ts-nocheck
import React, { Component } from "react";
import { connect } from "react-redux"; // Import connect
import { setSelectedChat } from "../../../../../../reducers/chat/chatActions";
import Avatar from "./Avatar";

class ChatListItems extends Component {
  constructor(props) {
    super(props);
  }

  selectChat = (e) => {
    for (
      let index = 0;
      index < e.currentTarget.parentNode.children.length;
      index++
    ) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
    const { name, setSelectedChat } = this.props;
    setSelectedChat(name);
    // console.log("Selected chat: ", name);
  };

  render() {
    return (
      <div
        style={{ animationDelay: `0.${this.props.animationDelay}s` }}
        onClick={this.selectChat}
        className={`chatlist__item ${
          this.props.active ? this.props.active : ""
        }`}
      >
        <Avatar
          image={
            this.props.image ? this.props.image : "http://placehold.it/80x80"
          }
          isOnline={this.props.isOnline}
        />

        <div className="userMeta">
          <p>{this.props.name}</p>
          <span className="activeTime">32 mins ago</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedChat: state.chat.selectedChat,
});

export default connect(mapStateToProps, { setSelectedChat })(ChatListItems);
