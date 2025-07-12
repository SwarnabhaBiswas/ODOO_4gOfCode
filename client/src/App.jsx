import { Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Exchange from "./pages/Exchange";
import UserData from "./pages/UserData"; 
import ProfileView from "./pages/ProfileView"; 

export default function App() {
  return (
    <div>
      <nav className="flex justify-between items-center bg-green shadow-md px-6 py-4 text-gray-800 backdrop-blur-md bg-green/70">
        <Link to="/" className="text-2xl font-semibold text-blue-600 tracking-wide text-white hover:text-green-300 transition">
          ReWear
        </Link>
        <div className="flex space-x-6 font-medium">
          <Link to="/" className="text-white hover:text-green-300 transition">Home</Link>
          <Link to="/exchange" className="text-white hover:text-green-300 transition">Exchange</Link>
          <Link to="/login" className="text-white hover:text-green-300 transition">Login</Link>
          <Link to="/signup" className="text-white hover:text-green-300 transition">Signup</Link>
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
