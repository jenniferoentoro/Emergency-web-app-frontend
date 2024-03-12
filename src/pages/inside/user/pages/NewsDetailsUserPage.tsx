import React, { useState } from "react";
import Content from "../../admin/test/layout/Content/Content";
import SidebarUser from "../../admin/test/layout/Sidebar/SidebarUser";
import ContentNewsDetails from "../../admin/test/components/ContentMain/ContentNewsDetails";
function NewsDetailsUserPage() {
  const [activeLinkIdx, setActiveLinkIdx] = useState(2);
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
        <Content contentMain={ContentNewsDetails} />
      </div>
    </>
  );
}
export default NewsDetailsUserPage;
