import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to Community Clothing Exchange</h1>
      <p>Give and take gently used clothes in your neighborhood.</p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/signup">
          <button style={{ marginRight: '1rem' }}>Join Now</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  )
}
