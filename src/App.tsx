import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/outside/HomePage";
import LoginPage from "./pages/outside/LoginPage";
import HomeInsidePage from "./pages/inside/HomeInsidePage";
// import LoginOauthPage from './pages/outside/LoginOauthPage';
import RegisterPage from "./pages/outside/RegisterPage";
import CategoryPage from "./pages/inside/admin/CategoryPage";
import NewsPage from "./pages/inside/admin/NewsPage";
import DatatableAdmin from "./pages/inside/admin/datatableAdmin";
import Chatroom from "./pages/inside/Chatroom";
import Loader from "./components/outside/Loader";
import ChatPage from "./pages/inside/chat/ChatPage";
import NewUser from "./pages/inside/News";
import NewsDetail from "./pages/inside/NewsDetail";
import Tutorial from "./pages/inside/admin/Tutorial/TutorialPage";
import TutorialUser from "./pages/inside/Tutorial";
import IncidentReport from "./pages/inside/IncidentReport";
import IncidentReportDetails from "./pages/inside/IncidentReportDetails";
import ChatAdminPages from "./pages/inside/admin/ChatAdminPages";
import IncidentReportAdmin from "./pages/inside/admin/test/components/ContentMain/IncidentReport";
// import Dashboard from "./components/inside/admin/CombinationSidebarNavbar";
import IncidentReportUpload from "./pages/inside/IncidentReportUpload";
import UploadUserPage from "./pages/inside/user/pages/UploadUserPage";
import IncidentReportMe from "./pages/inside/IncidentReportHistory";
import Test from "./pages/inside/admin/test/test";
import Statistic from "./pages/inside/Statistic";
import ChatPageV2 from "./pages/inside/chatv2/ChatPage";
import IncidentCategoryAdminPage from "./pages/inside/admin/pages/IncidentCategoryAdminPage";
import StatisticAdminPage from "./pages/inside/admin/pages/StatisticAdminPage";
import TutorialAdminPage from "./pages/inside/admin/pages/TutorialAdminPage";
import NewsAdminPage from "./pages/inside/admin/pages/NewsAdminPage";

import IncidentReportAdminPage from "./pages/inside/admin/pages/IncidentReportAdminPage";
import ChatAdminPage from "./pages/inside/admin/pages/ChatAdminPage";
import ManageUserAdminPage from "./pages/inside/admin/pages/ManageUserAdminPage";
import ContentTutorial from "./pages/inside/admin/test/components/ContentMain/ContentTutorial";
import EmergencyButtonPage from "./pages/inside/user/pages/EmergencyButtonPage";
import TutorialUserPage from "./pages/inside/user/pages/TutorialUserPage";
import NewsUserPage from "./pages/inside/user/pages/NewsUserPage";
import NewsDetailsUserPage from "./pages/inside/user/pages/NewsDetailsUserPage";
import IncidentReportUserPage from "./pages/inside/user/pages/IncidentReportUserPage";
import Maps from "./pages/inside/helper/pages/Maps";
import ChatPageUser from "./pages/inside/user/pages/ChatPageUser";
import HelperPage from "./pages/inside/helper/pages/StatisticAdminPage";
import HistoryUserPage from "./pages/inside/user/pages/HistoryUserPage";
import IncidentReportDetailsPage from "./pages/inside/user/pages/IncidentReportDetailsPage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* admin */}

          <Route path="/admin/manageuser" element={<ManageUserAdminPage />} />
          <Route path="/admin/news" element={<NewsAdminPage />} />

          <Route path="/admin/content" element={<ContentTutorial />} />
          <Route path="/admin/chat" element={<ChatAdminPage />} />
          <Route
            path="/admin/incidentreport"
            element={<IncidentReportAdminPage />}
          />
          <Route
            path="/admin/incidentCategory"
            element={<IncidentCategoryAdminPage />}
          />
          <Route path="/admin/statistic" element={<StatisticAdminPage />} />
          <Route path="/admin/tutorial" element={<TutorialAdminPage />} />

          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path={`/coba`} Component={Dashboard} /> */}

          {/* <Route path="/login/oauth" element={<LoginOauthPage />} /> */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<CategoryPage />} />
          {/* <Route path="/admin/news" element={<NewsPage />} /> */}
          <Route path="/admin/datatable" element={<DatatableAdmin />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/chatroom" element={<Chatroom />} />
          <Route path="/loader" element={<Loader />} />
          <Route path="/chat" element={<ChatPage />} />
          {/* <Route path="/admin/tutorial" element={<Tutorial />} /> */}
          {/* <Route path="/admin/chat" element={<ChatAdminPages />} /> */}
          {/* <Route
            path="/admin/incidentreport"
            element={<IncidentReportAdmin />}
          /> */}
          <Route path="/admin/test" element={<Test />} />

          {/* user */}
          {/* <Route
            path="/incidentreport/upload"
            element={<IncidentReportUpload />}
          /> */}

          <Route path="/incidentreport/upload" element={<UploadUserPage />} />
          <Route path="/incidentreport/history" element={<HistoryUserPage />} />
          <Route path="/home" element={<EmergencyButtonPage />} />
          <Route path="/news" element={<NewsUserPage />} />
          <Route path="/news/:id" element={<NewsDetailsUserPage />} />
          <Route path="/tutorial" element={<TutorialUserPage />} />
          <Route path="/incidentreport" element={<IncidentReportUserPage />} />
          <Route
            path="/incidentreport/:id"
            element={<IncidentReportDetailsPage />}
          />
          <Route path="/statistic" element={<Statistic />} />

          {/* chat v2 */}
          <Route path="/chatv2" element={<ChatPageUser />} />

          {/* helper */}
          <Route path="/helper/maps" element={<Maps />} />
          <Route path="/admin/helper" element={<HelperPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
