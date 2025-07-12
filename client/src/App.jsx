import { Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";

import Exchange from "./pages/Exchange"; 
import UserData from "./pages/UserData"; 
import AuthPage from './pages/Authpage' 
import ProfileView from "./pages/ProfileView"; 
import ProtectedRoute from "./Components/ProtectedRoute";


export default function App() {
  return (
    <div>
      <nav className="sticky top-0 z-50 flex justify-between items-center bg-white shadow-md px-6 py-4 text-gray-800 bg-gray-800">
        <Link to="/" className="text-2xl font-semibold text-green-700 tracking-wide hover:text-green-300 transition">
          ReWear
        </Link>

        <div className="flex space-x-6 font-medium">
          <Link to="/" className="text-white hover:text-green-300 transition">Home</Link>
          <Link to="/exchange" className="text-white hover:text-green-300 transition">Exchange</Link>
          <Link to="/listing" className="text-white hover:text-green-300 transition">View Listings</Link>
          <Link to="/authpage" className="text-white hover:text-green-300 transition">Login/Signup</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/exchange"
          element={
            <ProtectedRoute>
              <Exchange />
            </ProtectedRoute>
          }
        />
        <Route path="/userdata" element={<UserData />} />
        <Route path="/profileview" element={<ProfileView />} />
        <Route path="/authpage" element={<AuthPage />} />
      </Routes>
    </div>
  );
}
