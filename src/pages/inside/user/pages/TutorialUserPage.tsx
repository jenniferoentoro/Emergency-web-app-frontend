import React, { useState } from "react";
import Content from "../../admin/test/layout/Content/Content";
import SidebarUser from "../../admin/test/layout/Sidebar/SidebarUser";
import ContentTutorialUser from "../../admin/test/components/ContentMain/ContentTutorialUser";
function TutorialUserPage() {
  const [activeLinkIdx, setActiveLinkIdx] = useState(1);
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
        <Content contentMain={ContentTutorialUser} />
      </div>
    </>
  );
}
export default TutorialUserPage;
