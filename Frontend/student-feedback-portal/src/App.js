import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import DashboardRedirect from './pages/DashboardRedirect'; 
import FeedbackForm from './components/FeedbackForm';


// Reusable private route with role check
const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // 'Admin', 'Student', 'Faculty'

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Common Redirect Route for Logged In Users */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={['Admin', 'Student', 'Faculty']}>
              <DashboardRedirect />
            </PrivateRoute>
          }
        />

        {/* Role-Based Dashboards */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/student-dashboard"
          element={
            <PrivateRoute allowedRoles={['Student']}>
              <StudentDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/faculty-dashboard"
          element={
            <PrivateRoute allowedRoles={['Faculty']}>
              <FacultyDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/feedback/:courseId"
          element={
            <PrivateRoute allowedRoles={['Student']}>
              <FeedbackForm />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
