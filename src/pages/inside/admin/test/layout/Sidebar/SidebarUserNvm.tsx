// @ts-nocheck
import { useEffect, useState } from "react";
import { navigationLinks } from "../../data/data";
import "./Sidebar.css";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import ChatIcon from "@mui/icons-material/Chat";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ReportIcon from "@mui/icons-material/Report";
const SidebarUser = () => {
  const [activeLinkIdx] = useState(1);
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
          <li className="nav-item">
            <a href="#" className="nav-link active">
              <ChatIcon className="nav-link-icon" style={{ color: "white" }} />
              <span className="nav-link-text text-white"> Emergency</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <AnalyticsIcon
                className="nav-link-icon"
                style={{ color: "white" }}
              />
              <span className="nav-link-text text-white"> Statisctics</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <OndemandVideoIcon
                className="nav-link-icon"
                style={{ color: "white" }}
              />
              <span className="nav-link-text text-white"> Tutorial</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <NewspaperIcon
                className="nav-link-icon"
                style={{ color: "white" }}
              />
              <span className="nav-link-text text-white"> News</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
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

          {/* <li className="nav-item">
            <a href="#" className="nav-link" onClick={handleMenuOpen}>
              <ChatIcon
                className="nav-link-icon"
                fontSize="large"
                style={{ color: "white" }}
              />
              <span className="nav-link-text text-white"> Incident Report</span>
            </a>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>History</MenuItem>
              <MenuItem onClick={handleMenuClose}>See All</MenuItem>
            </Menu>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarUser;
