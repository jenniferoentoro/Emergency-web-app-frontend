import React, { useState } from "react";
import Content from "../test/layout/Content/Content";
import Sidebar from "../test/layout/Sidebar/Sidebar";
import ContentNews from "../test/components/ContentMain/ContentNews";
function NewsAdminPage() {
  const [activeLinkIdx, setActiveLinkIdx] = useState(4);
  const handleLinkClick = (idx: any) => {
    setActiveLinkIdx(idx);
  };

  return (
    <>
      <div className="app">
        <Sidebar activeLinkIdx={activeLinkIdx} onLinkClick={handleLinkClick} />
        <Content contentMain={ContentNews} />
      </div>
    </>
  );
}
export default NewsAdminPage;
