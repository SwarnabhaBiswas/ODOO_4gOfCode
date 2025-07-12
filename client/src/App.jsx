import { Routes, Route, Link } from 'react-router-dom'
import Landing from './pages/Landing'
import AuthPage from './pages/Authpage' 
import Exchange from './pages/Exchange'


export default function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/exchange" style={{ marginRight: '1rem' }}>Exchange</Link> {/* ✅ */}
        <Link to="/authpage" style={{ marginRight: '1rem' }}>Login / Signup</Link> {/* ✅ Replaced both */}
       
       
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/exchange" element={<Exchange />} /> {/* ✅ */}
        <Route path="/authpage" element={<AuthPage />} />

      </Routes>
    </div>
  )
}
