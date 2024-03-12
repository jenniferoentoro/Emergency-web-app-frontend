// @ts-nocheck
import { useEffect, useState } from "react";
import { navigationLinks } from "../../data/data";
import "./Sidebar.css";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import CategoryIcon from "@mui/icons-material/Category";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ChatIcon from "@mui/icons-material/Chat";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ReportIcon from "@mui/icons-material/Report";
import GroupIcon from "@mui/icons-material/Group";
const SidebarUser = ({ activeLinkIdx, onLinkClick }) => {
  // const [activeLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const { isSidebarOpen } = useContext(SidebarContext);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass("sidebar-change");
    } else {
      setSidebarClass("");
    }
  }, [isSidebarOpen]);

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <div className="">
          <img
            className="w-100"
            src="/images/logo-white.png"
            alt="profile image"
          />
        </div>
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          <li className={`nav-item ${activeLinkIdx === 0 ? "active" : ""}`}>
            <a href="/home" className="nav-link" onClick={() => onLinkClick(0)}>
              <ChatIcon className="nav-link-icon" style={{ color: "white" }} />
              <span className="nav-link-text text-white"> Emergency</span>
            </a>
          </li>

          <li className={`nav-item ${activeLinkIdx === 1 ? "active" : ""}`}>
            <a
              href="/tutorial"
              className="nav-link"
              onClick={() => onLinkClick(1)}
            >
              <OndemandVideoIcon
                className="nav-link-icon"
                style={{ color: "white" }}
              />
              <span className="nav-link-text text-white"> Tutorial</span>
            </a>
          </li>

          <li className={`nav-item ${activeLinkIdx === 2 ? "active" : ""}`}>
            <a href="/news" className="nav-link" onClick={() => onLinkClick(2)}>
              <NewspaperIcon
                className="nav-link-icon"
                style={{ color: "white" }}
              />
              <span className="nav-link-text text-white"> News</span>
            </a>
          </li>
          <li className={`nav-item ${activeLinkIdx === 3 ? "active" : ""}`}>
            <a
              href="/incidentreport"
              className="nav-link"
              onClick={() => onLinkClick(3)}
            >
              <ReportIcon
                className="nav-link-icon"
                style={{ color: "white" }}
              />
              <span className="nav-link-text text-white">
                {" "}
                Incident Reports
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarUser;
