import React, { useState } from "react";
import Content from "../../admin/test/layout/Content/Content";
import SidebarUser from "../../admin/test/layout/Sidebar/SidebarUser";
import ContentIncidentReportDetailsUser from "../../admin/test/components/ContentMain/ContentIncidentReportDetailsUser";
function IncidentReportDetailsUserPage() {
  const [activeLinkIdx, setActiveLinkIdx] = useState(3);
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
        <Content contentMain={ContentIncidentReportDetailsUser} />
      </div>
    </>
  );
}
export default IncidentReportDetailsUserPage;
