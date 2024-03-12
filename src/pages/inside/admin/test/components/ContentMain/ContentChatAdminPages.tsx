import ChatBody from "../../../../../../components/inside/admin/Chat/chatBody/ChatBody";
import UserAPI from "../../../../../../apis/UserAPI";
import "./ChatAdminPages.css";

import { useEffect, useState } from "react";
function ContentChatAdminPage() {
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const userDetailsResponse = await UserAPI.getMySelf();
        setUserDetails(userDetailsResponse);
        const hasAdminRole = userDetailsResponse.roles.some(
          (role: any) => role.role === "ADMIN"
        );

        if (!hasAdminRole) {
          window.location.href = "/home";
          return;
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
    <div className="color-background ">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="__main">
              <ChatBody />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ContentChatAdminPage;
