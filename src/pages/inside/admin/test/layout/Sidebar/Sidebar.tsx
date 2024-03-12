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
import UserAPI from "../../../../../../apis/UserAPI";
import SosIcon from "@mui/icons-material/Sos";
const Sidebar = ({ activeLinkIdx, onLinkClick }) => {
  const [userDetails, setUserDetails] = useState(null);

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

    async function fetchUserDetails() {
      try {
        const userDetailsResponse = await UserAPI.getMySelf();
        setUserDetails(userDetailsResponse);
        const hasAdminRole = userDetailsResponse.roles.some(
          (role) => role.role === "ADMIN"
        );
        const hasHelperRole = userDetailsResponse.roles.some(
          (role) => role.role === "HELPER"
        );
      } catch (error) {
        console.error("Error fetching user details:", error);
        window.location.href = "/login";
      }
    }

    fetchUserDetails();
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
          {userDetails &&
            userDetails.roles.some((role) => role.role === "ADMIN") && (
              <>
                <li
                  className={`nav-item ${activeLinkIdx === 0 ? "active" : ""}`}
                >
                  <a
                    href="/admin/statistic"
                    className="nav-link"
                    onClick={() => onLinkClick(0)}
                  >
                    <AnalyticsIcon
                      className="nav-link-icon"
                      style={{ color: "white" }}
                    />
                    <span className="nav-link-text text-white">
                      {" "}
                      Statisctics
                    </span>
                  </a>
                </li>
                <li
                  className={`nav-item ${activeLinkIdx === 1 ? "active" : ""}`}
                >
                  <a
                    href="/admin/chat"
                    className="nav-link"
                    onClick={() => onLinkClick(1)}
                  >
                    <ChatIcon
                      className="nav-link-icon"
                      style={{ color: "white" }}
                    />
                    <span className="nav-link-text text-white">Chat</span>
                  </a>
                </li>
                <li
                  className={`nav-item ${activeLinkIdx === 2 ? "active" : ""}`}
                >
                  <a
                    href="/admin/incidentCategory"
                    className="nav-link"
                    onClick={() => onLinkClick(2)}
                  >
                    <CategoryIcon
                      className="nav-link-icon"
                      style={{ color: "white" }}
                    />
                    <span className="nav-link-text text-white">
                      Incident Category
                    </span>
                  </a>
                </li>

                <li
                  className={`nav-item ${activeLinkIdx === 3 ? "active" : ""}`}
                >
                  <a
                    href="/admin/tutorial"
                    className="nav-link"
                    onClick={() => onLinkClick(3)}
                  >
                    <OndemandVideoIcon
                      className="nav-link-icon"
                      style={{ color: "white" }}
                    />
                    <span className="nav-link-text text-white"> Tutorial</span>
                  </a>
                </li>
                <li
                  className={`nav-item ${activeLinkIdx === 4 ? "active" : ""}`}
                >
                  <a
                    href="/admin/news"
                    className="nav-link"
                    onClick={() => onLinkClick(4)}
                  >
                    <NewspaperIcon
                      className="nav-link-icon"
                      style={{ color: "white" }}
                    />
                    <span className="nav-link-text text-white"> News</span>
                  </a>
                </li>
                <li
                  className={`nav-item ${activeLinkIdx === 5 ? "active" : ""}`}
                >
                  <a
                    href="/admin/incidentreport"
                    className="nav-link"
                    onClick={() => onLinkClick(5)}
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

                <li
                  className={`nav-item ${activeLinkIdx === 6 ? "active" : ""}`}
                >
                  <a
                    href="/admin/manageuser"
                    className="nav-link"
                    onClick={() => onLinkClick(6)}
                  >
                    <GroupIcon
                      className="nav-link-icon"
                      style={{ color: "white" }}
                    />
                    <span className="nav-link-text text-white">
                      Manage Admin
                    </span>
                  </a>
                </li>
              </>
            )}

          {userDetails &&
            userDetails.roles.some((role) => role.role === "HELPER") && (
              <li className={`nav-item ${activeLinkIdx === 7 ? "active" : ""}`}>
                <a
                  href="/admin/helper"
                  className="nav-link"
                  onClick={() => onLinkClick(7)}
                >
                  <SosIcon
                    className="nav-link-icon"
                    style={{ color: "white" }}
                  />
                  <span className="nav-link-text text-white">Helper</span>
                </a>
              </li>
            )}

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

export default Sidebar;
