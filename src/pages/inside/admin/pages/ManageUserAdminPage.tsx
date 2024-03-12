import React, { useState } from "react";
import Content from "../test/layout/Content/Content";
import Sidebar from "../test/layout/Sidebar/Sidebar";
import ContentManageUser from "../test/components/ContentMain/ContentManageUser";
function ManageUserAdminPage() {
  const [activeLinkIdx, setActiveLinkIdx] = useState(6);
  const handleLinkClick = (idx: any) => {
    setActiveLinkIdx(idx);
  };

  return (
    <>
      <div className="app">
        <Sidebar activeLinkIdx={activeLinkIdx} onLinkClick={handleLinkClick} />
        <Content contentMain={ContentManageUser} />
      </div>
    </>
  );
}
export default ManageUserAdminPage;
