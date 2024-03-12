import React, { useState } from "react";
import Content from "../test/layout/Content/Content";
import Sidebar from "../test/layout/Sidebar/Sidebar";
import ContentStatisticPage from "../test/components/ContentMain/ContentStatisticPage";
function StatisticAdminPage() {
  const [activeLinkIdx, setActiveLinkIdx] = useState(0);
  const handleLinkClick = (idx: any) => {
    setActiveLinkIdx(idx);
  };

  return (
    <>
      <div className="app">
        <Sidebar activeLinkIdx={activeLinkIdx} onLinkClick={handleLinkClick} />
        <Content contentMain={ContentStatisticPage} />
      </div>
    </>
  );
}
export default StatisticAdminPage;
