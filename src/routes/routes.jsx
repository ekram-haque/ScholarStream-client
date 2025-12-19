import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../pages/dashboard/MyProfile";
import allScholarShips from "../pages/allScholarShips";
import ScholarshipDetails from "../pages/ScholarShipDetails";

import AdminAnalytics from "../pages/dashboard/admin/AdminAnalytics";
import AddScholarship from "../pages/dashboard/admin/AddScholarship";
import ManageScholarships from "../pages/dashboard/admin/ManageScholarShip";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";

import ManageApplication from "../pages/dashboard/moderator/ManageApplications";
import AllReviews from "../pages/dashboard/moderator/AllReviews";

import MyApplications from "../pages/dashboard/student/MyApplications";
import MyReviews from "../pages/dashboard/student/MyReviews";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "home",
        Component: Home,
      },
      {
        path: "all-scholarships",
        Component: allScholarShips,
      },
      {
        path: "scholarships/:id",
        Component: ScholarshipDetails,
      },
    ],
  },
  {
    path: "authentication",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "forget-password",
        element: <ForgetPassword></ForgetPassword>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },

      //admin routes
      {
        path: "add-scholarship",
        element: <AddScholarship></AddScholarship>,
      },
      {
        path: "manage-scholarship",
        element: <ManageScholarships></ManageScholarships>,
      },

      {
        path: "admin-analytics",
        element: <AdminAnalytics></AdminAnalytics>,
      },
      {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>,
      },

      //moderator routes
      {
        path: "manage-application",
        element: <ManageApplication></ManageApplication>,
      },
      {
        path: "all-reviews",
        element: <AllReviews></AllReviews>,
      },

      //student routes
      {
        path: "my-applications",
        element: <MyApplications></MyApplications>,
      },
      {
        path: "my-reviews",
        element: <MyReviews></MyReviews>,
      },
    ],
  },
]);

export default router;
