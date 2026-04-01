import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      register(name, email, password)
      navigate('/')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fadeInUp">
        <div className="text-center">
          <div className="text-7xl mb-6 animate-bounce">🚀</div>
          <h2 className="text-4xl font-bold text-gradient mb-2">Join BlogHub</h2>
          <p className="text-lg text-gray-700 font-medium">
            Create your account and start sharing your stories
          </p>
        </div>
        <div className="card-premium py-10 px-8">
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
                👤 Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-premium"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
                📧 Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-premium"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
                🔑 Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-premium"
                placeholder="Create a password"
              />
            </div>

            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-800 px-5 py-4 rounded-lg font-semibold">
                ❌ {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex justify-center items-center gap-2 py-4 uppercase font-bold tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Creating Account...
                  </>
                ) : (
                  '✨ Create Account'
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-700 font-semibold">
              Already have an account?{' '}
              <Link to="/login" className="text-gradient font-bold hover:opacity-80 transition-opacity">
                Sign in here →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}