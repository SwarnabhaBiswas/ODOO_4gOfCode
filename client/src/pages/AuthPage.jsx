import React, { useState } from 'react'

export default function AuthPage() {
  const [mode, setMode] = useState('login') // or 'signup'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const toggleMode = () => {
    setMode(prev => (prev === 'login' ? 'signup' : 'login'))
    setName('')
    setEmail('')
    setPassword('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const endpoint = mode === 'signup' ? '/api/users/signup' : '/api/users/login'
    const payload = mode === 'signup' ? { name, email, password } : { email, password }

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')

      alert(`${mode === 'signup' ? 'Signup' : 'Login'} successful!`)
      localStorage.setItem('token', data.token)
      // Optional: redirect user to Exchange page or dashboard
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>{mode === 'login' ? 'Login' : 'Signup'}</h2>
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={styles.input}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            {mode === 'login' ? 'Login' : 'Signup'}
          </button>
        </form>
        <p style={styles.toggleText}>
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span onClick={toggleMode} style={styles.toggleLink}>
            {mode === 'login' ? 'Sign up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  box: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '1rem',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  input: {
    display: 'block',
    width: '100%',
    marginBottom: '1rem',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
  },
  toggleText: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  toggleLink: {
    color: '#007bff',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
}
