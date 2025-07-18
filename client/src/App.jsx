import { Routes, Route, Link } from 'react-router-dom'
import Landing from './pages/Landing'
import AuthPage from './pages/Authpage';
import Exchange from './pages/Exchange' // ✅ Import
import NGOs from './pages/NGOs';
import Listing  from './pages/Listing'
import Map from "./pages/Map";
import ProtectedRoute from './Components/ProtectedRoute';
import UserData from './pages/UserData';  
import ProfileView from './pages/ProfileView'; 



export default function App() {
  return (
    <div>
      <nav className="sticky top-0 z-50 flex justify-between items-center bg-white shadow-md px-6 py-4 text-gray-800 bg-gray-800">
        <Link to="/" className="text-2xl font-semibold text-green-700 tracking-wide hover:text-green-300 transition">
          ReWear
        </Link>

        <div className="flex space-x-6 font-medium">
          <Link to="/" className="hover:text-green-600 transition">Home</Link>
          <Link to="/exchange" className="hover:text-green-600 transition">Exchange</Link>
          <Link to="/authpage" className="hover:text-green-600 transition">Login</Link>
          <Link to="/authpage" className="hover:text-green-600 transition">Signup</Link>
          <Link to="/Map" className="hover:text-green-600 transition">Map</Link>

        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Landing />} />
      
        <Route path="/ngos" element={<NGOs />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/map" element={<Map />} />
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
