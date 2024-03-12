import React, { useState } from "react";
import Content from "../test/layout/Content/Content";
import Sidebar from "../test/layout/Sidebar/Sidebar";
import ContentChatAdminPage from "../test/components/ContentMain/ContentChatAdminPages";
function ChatAdminPage() {
  const [activeLinkIdx, setActiveLinkIdx] = useState(1);
  const handleLinkClick = (idx: any) => {
    setActiveLinkIdx(idx);
  };

  return (
    <>
      <div className="app">
        <Sidebar activeLinkIdx={activeLinkIdx} onLinkClick={handleLinkClick} />
        <Content contentMain={ContentChatAdminPage} />
      </div>
    </>
  );
}
export default ChatAdminPage;
