import React, { useState } from "react";
import Content from "../test/layout/Content/Content";
import Sidebar from "../test/layout/Sidebar/Sidebar";
import ContentMain from "../test/components/ContentMain/ContentIncidentCategory";
function IncidentCategoryAdminPage() {
  const [activeLinkIdx, setActiveLinkIdx] = useState(2);
  const handleLinkClick = (idx: any) => {
    setActiveLinkIdx(idx);
  };

  return (
    <>
      <div className="app">
        <Sidebar activeLinkIdx={activeLinkIdx} onLinkClick={handleLinkClick} />
        <Content contentMain={ContentMain} />
      </div>
    </>
  );
}
export default IncidentCategoryAdminPage;
