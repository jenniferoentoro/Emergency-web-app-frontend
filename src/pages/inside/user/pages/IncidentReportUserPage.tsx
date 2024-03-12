import React, { useState } from "react";
import Content from "../../admin/test/layout/Content/Content";
import SidebarUser from "../../admin/test/layout/Sidebar/SidebarUser";
import ContentIncidentReportUser from "../../admin/test/components/ContentMain/ContentIncidentReportUser";
function IncidentReportUserPage() {
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
        <Content contentMain={ContentIncidentReportUser} />
      </div>
    </>
  );
}
export default IncidentReportUserPage;
