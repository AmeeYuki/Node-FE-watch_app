import { createBrowserRouter } from "react-router-dom";
import Loadable from "./Loadable";
import MainLayout from "../layout/MainLayout";
import AuthGuard from "./AuthGuard";
import GuestGuard from "./GuestGuard";
import AdminGuard from "./AdminGuard";

const Login = Loadable({ loader: () => import("../pages/login/Login") });
const Register = Loadable({ loader: () => import("../pages/login/Register") });
const Home = Loadable({ loader: () => import("../pages/home/Home") });
const Profile = Loadable({ loader: () => import("../pages/user/Profile") });

const UpdatePassword = Loadable({
  loader: () => import("../pages/user/UpdatePassword"),
});

const WatchDetail = Loadable({
  loader: () => import("../pages/home/WatchDetail"),
});
const BrandDashboard = Loadable({
  loader: () => import("../pages/dashboard/Brands"),
});
const WatchDashboard = Loadable({
  loader: () => import("../pages/dashboard/Watches"),
});
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard />,

    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "",
            element: Home,
          },
          {
            path: "profile/:id",
            element: Profile,
          },
          {
            path: "watches/:id",
            element: WatchDetail,
          },
          {
            path: "update-password",
            element: UpdatePassword,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <GuestGuard />,
    children: [
      {
        path: "login",
        element: Login,
      },
      {
        path: "/register",
        element: Register,
      },
    ],
  },
  {
    path: "/",
    element: <AdminGuard />,

    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "brands-dashboard",
            element: BrandDashboard,
          },
          {
            path: "watches-dashboard",
            element: WatchDashboard,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <div>ERROR</div>,
  },
]);
