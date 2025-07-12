import { Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Exchange from "./pages/Exchange"; // ✅ Import
import UserData from "./pages/UserData"; // ✅ Import
import ProfileView from "./pages/ProfileView"; // ✅ Import

export default function App() {
  return (
    <div>
      <nav className="flex justify-items align-items">
        <Link to="/" style={{ marginRight: "1rem" }}>
          Home
        </Link>
        <Link to="/exchange" style={{ marginRight: "1rem" }}>
          Exchange
        </Link>{" "}
        {/* ✅ */}
        <Link to="/login" style={{ marginRight: "1rem" }}>
          Login
        </Link>
        <Link to="/signup">Signup</Link>
        <Link to="/userdata"> UserData</Link>
        <Link to="/profileview"> ProfileView</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/exchange" element={<Exchange />} /> {/* ✅ */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userdata" element={<UserData />} />
        <Route path="/profileview" element={<ProfileView />} />
      </Routes>
    </div>
  );
}
