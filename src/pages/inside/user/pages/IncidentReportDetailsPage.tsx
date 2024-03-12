import React, { useState } from "react";
import Content from "../../admin/test/layout/Content/Content";
import SidebarUser from "../../admin/test/layout/Sidebar/SidebarUser";
import ContentIncidentDetail from "../../admin/test/components/ContentMain/ContentIncidentDetail";
function IncidentReportDetailsPage() {
  const [activeLinkIdx, setActiveLinkIdx] = useState(7);
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
        <Content contentMain={ContentIncidentDetail} />
      </div>
    </>
  );
}
export default IncidentReportDetailsPage;
