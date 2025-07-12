import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = JSON.parse(localStorage.getItem("token"));

  if (!token) {
    // Not logged in, redirect to AuthPage
    return <Navigate to="/authpage" />;
  }

  return children;
}
