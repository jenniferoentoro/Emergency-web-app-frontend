import React, { useState } from "react";
import Content from "../../admin/test/layout/Content/Content";
import Sidebar from "../../admin/test/layout/Sidebar/Sidebar";
import ContentHelp from "../../admin/test/components/ContentMain/ContentHelp";
function HelperPage() {
  const [activeLinkIdx, setActiveLinkIdx] = useState(7);
  const handleLinkClick = (idx: any) => {
    setActiveLinkIdx(idx);
  };

  return (
    <>
      <div className="app">
        <Sidebar activeLinkIdx={activeLinkIdx} onLinkClick={handleLinkClick} />
        <Content contentMain={ContentHelp} />
      </div>
    </>
  );
}
export default HelperPage;
