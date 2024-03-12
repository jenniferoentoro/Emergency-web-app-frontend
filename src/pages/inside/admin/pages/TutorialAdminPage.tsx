import React, { useState } from "react";
import Content from "../test/layout/Content/Content";
import Sidebar from "../test/layout/Sidebar/Sidebar";
import ContentTutorial from "../test/components/ContentMain/ContentTutorial";
function TutorialAdminPage() {
  const [activeLinkIdx, setActiveLinkIdx] = useState(3);
  const handleLinkClick = (idx: any) => {
    setActiveLinkIdx(idx);
  };

  return (
    <>
      <div className="app">
        <Sidebar activeLinkIdx={activeLinkIdx} onLinkClick={handleLinkClick} />
        <Content contentMain={ContentTutorial} />
      </div>
    </>
  );
}
export default TutorialAdminPage;
