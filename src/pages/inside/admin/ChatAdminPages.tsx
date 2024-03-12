import ChatBody from "../../../components/inside/admin/Chat/chatBody/ChatBody";
import NavbarInside from "../../../components/inside/navbar/admin/NavbarInside";
import UserAPI from "../../../apis/UserAPI";
import "./ChatAdminPages.css";

import { useEffect, useState } from "react";
function ChatAdminPages() {
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const userDetailsResponse = await UserAPI.getMySelf();
        setUserDetails(userDetailsResponse);
        if (userDetailsResponse.roles[0].role !== "ADMIN") {
          window.location.href = "/home";
        }
      } catch (error) {
        window.location.href = "/login";
        return;
        console.error("Error fetching user details:", error);
      }
    }

    fetchUserDetails();
  }, []);

  return (
    <div className="color-background min-h-screen">
      <NavbarInside>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-6">
              <div className="__main">
                <ChatBody />
              </div>
            </div>
          </div>
        </div>
      </NavbarInside>
    </div>

    // <div className="root container-fluid">
    //   <div className="row justify-content-center">
    //     <div className="col-12">

    //     </div>
    //   </div>
    // </div>
  );
}
export default ChatAdminPages;
