import React, { useState } from "react";
import Content from "../../admin/test/layout/Content/Content";
import SidebarUser from "../../admin/test/layout/Sidebar/SidebarUser";
import ContentEmergencyButton from "../../admin/test/components/ContentMain/ContentEmergencyButton";
function EmergencyButtonPage() {
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
        <Content contentMain={ContentEmergencyButton} />
      </div>
    </>
  );
}
export default EmergencyButtonPage;
