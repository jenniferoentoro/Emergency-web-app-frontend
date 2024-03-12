// @ts-nocheck
import { Icon } from "@chakra-ui/react";
// import { MdBarChart, MdPerson, MdHome, MdLock, MdOutlineShoppingCart } from 'react-icons/md';
import HomeIcon from "@mui/icons-material/Home";
// Admin Imports
// import MainDashboard from 'views/admin/default';
// import NFTMarketplace from 'views/admin/marketplace';
// import Profile from 'views/admin/profile';
// import DataTables from 'views/admin/dataTables';
// import RTL from 'views/admin/rtl';
import UserReports from "../../../../pages/inside/admin/Tutorial/TutorialPage";
// Auth Imports

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={HomeIcon} width="20px" height="20px" color="inherit" />,
    component: UserReports,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: <Icon as={HomeIcon} width="20px" height="20px" color="inherit" />,
    component: UserReports,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <Icon as={HomeIcon} width="20px" height="20px" color="inherit" />,
    path: "/data-tables",
    component: UserReports,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={HomeIcon} width="20px" height="20px" color="inherit" />,
    component: UserReports,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={HomeIcon} width="20px" height="20px" color="inherit" />,
    component: UserReports,
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "/rtl-default",
    icon: <Icon as={HomeIcon} width="20px" height="20px" color="inherit" />,
    component: UserReports,
  },
];

export default routes;
