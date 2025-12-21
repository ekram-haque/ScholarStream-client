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
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";
import PaymentPage from "../pages/dashboard/payment/PaymentPage";
import PaymentSuccess from "../pages/dashboard/payment/PaymentSuccess";
import PaymentCancelled from "../pages/dashboard/payment/Paymentcancelled";
import Error404 from "../pages/Eror404";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "*",
        element: <Error404 />,
      },
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
        path: "*",
        element: <Error404 />,
      },
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
        path: "*",
        element: <Error404 />,
      },
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
        element: (
          <AdminRoute>
            <ManageScholarships></ManageScholarships>
          </AdminRoute>
        ),
      },

      {
        path: "admin-analytics",
        element: (
          <AdminRoute>
            <AdminAnalytics></AdminAnalytics>
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },

      //moderator routes
      {
        path: "manage-applications",
        element: (
          <ModeratorRoute>
            <ManageApplication></ManageApplication>
          </ModeratorRoute>
        ),
      },
      {
        path: "all-reviews",
        element: (
          <ModeratorRoute>
            <AllReviews></AllReviews>
          </ModeratorRoute>
        ),
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
      {
        path: "payment/:id",
        element: <PaymentPage />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled />,
      },
    ],
  },
]);

export default router;
