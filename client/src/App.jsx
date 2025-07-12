import { Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Exchange from "./pages/Exchange"; // ✅ Import
import UserData from "./pages/UserData"; // ✅ Import
import ProfileView from "./pages/ProfileView"; // ✅ Import

export default function App() {
  return (
    <div >
      <nav className="sticky top-0 bg-gray-800 shadow p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
          <span className="font-bold text-xl text-white">ReWear</span>
        </div>
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-green-500 text-lg">Home</Link>
          <Link to="/exchange" className="text-white hover:text-green-500 text-lg">Exchange</Link>
          <Link to="/profileview" className="text-white hover:text-green-500 text-lg">Profile</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userdata" element={<UserData />} />
        <Route path="/profileview" element={<ProfileView />} />
      </Routes>
    </div>
  );
}
