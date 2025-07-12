import { Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Exchange from "./pages/Exchange"; // ✅ Import
import UserData from "./pages/UserData"; // ✅ Import
import AuthPage from './pages/Authpage' 
import ProfileView from "./pages/ProfileView"; 


export default function App() {
  return (
    <div>
      <nav className="flex justify-between items-center bg-green shadow-md px-6 py-4 text-gray-800">
        {/* Brand */}
        <Link to="/" className="text-2xl font-semibold text-blue-600 tracking-wide">
          ReWear
        </Link>

        <div className="flex space-x-6 font-medium">
          <Link to="/" className="hover:text-green-600 transition">Home</Link>
          <Link to="/exchange" className="hover:text-green-600 transition">Exchange</Link>
          <Link to="/authpage">Login/Signup</Link>

          
        </div>


      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/userdata" element={<UserData />} />
        <Route path="/profileview" element={<ProfileView />} />
        <Route path="/authpage" element={<AuthPage />} />


      </Routes>
    </div>
  );
}
