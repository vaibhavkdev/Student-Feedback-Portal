import { Navigate } from "react-router-dom";

export default function DashboardRedirect() {
  const role = localStorage.getItem("role");

  switch (role) {
    case "Admin":
      return <Navigate to="/admin-dashboard" />;
    case "Student":
      return <Navigate to="/student-dashboard" />;
    case "Faculty":
      return <Navigate to="/faculty-dashboard" />;
    default:
      return <Navigate to="/" />;
  }
}
