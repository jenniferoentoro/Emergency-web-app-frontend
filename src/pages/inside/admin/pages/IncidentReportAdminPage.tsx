import React, { useState } from "react";
import Content from "../test/layout/Content/Content";
import Sidebar from "../test/layout/Sidebar/Sidebar";
import IncidentReport from "../test/components/ContentMain/IncidentReport";
function IncidentReportAdminPage() {
  const [activeLinkIdx, setActiveLinkIdx] = useState(5);
  const handleLinkClick = (idx: any) => {
    setActiveLinkIdx(idx);
  };

  return (
    <>
      <div className="app">
        <Sidebar activeLinkIdx={activeLinkIdx} onLinkClick={handleLinkClick} />
        <Content contentMain={IncidentReport} />
      </div>
    </>
  );
}
export default IncidentReportAdminPage;
