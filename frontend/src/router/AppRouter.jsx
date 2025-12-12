import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Courses from "../pages/Courses";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MyCourses from "../pages/MyCourses";

import Dashboard from "../pages/UserDashboard/Dashboard";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import ManageCourses from "../pages/AdminDashboard/ManageCourses";


import ProtectedRoute from "../utils/ProtectedRoute";
import AdminRoute from "../utils/AdminRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* user dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* admin dashboard */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
<Route
  path="/admin/manage-courses"
  element={
    <AdminRoute>
      <ManageCourses />
    </AdminRoute>
  }
/>

      <Route
  path="/my-courses"
  element={
    <ProtectedRoute>
      <MyCourses />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}
