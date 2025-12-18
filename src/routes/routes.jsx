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
import MyApplications from "../pages/dashboard/student/MyApplications";
import ScholarshipDetails from "../pages/ScholarShipDetails";

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
        path:'home',
        Component:Home
      },
      {
        path:'all-scholarships',
        Component:allScholarShips
      },
      {
        path:'scholarships/:id',
        Component:ScholarshipDetails
      }
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
  path: 'dashboard',
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    {
      path: 'my-profile',
      element: <MyProfile />
    },
    {
      path: 'my-applications',
      element: <MyApplications />
    },
  ]
}

]);

export default router;
