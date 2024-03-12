// @ts-nocheck
import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./Content.css";
import ContentTop from "../../components/ContentTop/ContentTop";
import { SidebarContext } from "../../context/sidebarContext";

const Content = ({ contentMain: ContentMain }) => {
  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <div
      className={`main-content ${
        isSidebarOpen ? "sidebar-closed" : "sidebar-open"
      }`}
    >
      <ContentTop />
      <ContentMain />
    </div>
  );
};

Content.propTypes = {
  contentMain: PropTypes.elementType.isRequired,
};

export default Content;
