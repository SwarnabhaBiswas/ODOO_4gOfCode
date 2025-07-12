import React, { useState } from 'react'

export default function AuthPage() {
  const [mode, setMode] = useState('login')
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
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Request failed')

      alert(`${mode === 'signup' ? 'Signup' : 'Login'} successful!`)
      localStorage.setItem('token', data.token)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="flex w-screen items-center justify-center min-h-screen bg-[#f5f5f4]">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">ReWear</h1>
          <p className="text-sm text-gray-500">
            {mode === 'login' ? 'Welcome back! Please login.' : 'Create a new account to get started.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            onClick={toggleMode}
            className="text-green-600 font-semibold cursor-pointer hover:underline"
          >
            {mode === 'login' ? 'Sign up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  )
}
