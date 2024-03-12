import React, { useState } from "react";
import Content from "../../admin/test/layout/Content/Content";
import SidebarUser from "../../admin/test/layout/Sidebar/SidebarUser";
import ContentChatUser from "../../admin/test/components/ContentMain/ContentChatUser";
function ChatPageUser() {
  const [activeLinkIdx, setActiveLinkIdx] = useState(0);
  const handleLinkClick = (idx: any) => {
    setActiveLinkIdx(idx);
  };

  return (
    <>
      <div className="app">
        <SidebarUser
          activeLinkIdx={activeLinkIdx}
          onLinkClick={handleLinkClick}
        />
        <Content contentMain={ContentChatUser} />
      </div>
    </>
  );
}
export default ChatPageUser;
