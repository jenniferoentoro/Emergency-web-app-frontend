// @ts-nocheck
import MenuIcon from "@mui/icons-material/Menu";
import "./ContentTop.css";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const ContentTop = () => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  const { toggleSidebar } = useContext(SidebarContext);
  return (
    <div className="main-content-top">
      <div className="content-top-left">
        <span
          type="button"
          className="sidebar-toggler"
          onClick={() => toggleSidebar()}
        >
          <MenuIcon
            fontSize="large"
            // className="mb-2"
            style={{ color: "white" }}
          />
          {/* <img src={MenuIcon} alt="" /> */}
        </span>
        <h3 className="content-top-title mt-2 text-white">Home</h3>
      </div>
      <div className="content-top-btns">
        <button type="button" className="search-btn content-top-btn">
          <NotificationsIcon
            fontSize="large"
            // className="mb-2"
            style={{ color: "white" }}
          />
        </button>
        <span className="notification-btn content-top-btn">
          <AccountCircleIcon
            fontSize="large"
            className="mb-1 cursor-pointer"
            style={{ color: "white" }}
            onClick={handleLogout}
          />
          <span className="notification-btn-dot"></span>
        </span>
      </div>
    </div>
  );
};

export default ContentTop;
