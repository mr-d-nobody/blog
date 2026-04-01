import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-5">
          <Link to="/" className="text-3xl font-black hover:scale-110 transition-transform duration-300 flex items-center gap-2">
            <span className="text-4xl">✨</span>
            <span>BlogHub</span>
          </Link>
          <nav className="flex items-center space-x-8">
            <Link to="/" className="header-nav text-lg font-semibold">
              🏠 Home
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="header-nav text-lg font-semibold">
                  👤 Profile
                </Link>
                <Link to="/create-post" className="bg-white text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-bold px-5 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white">
                  ✏️ Write
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="header-nav text-lg font-semibold">
                  🔐 Login
                </Link>
                <Link to="/register" className="bg-white text-blue-600 px-5 py-2 rounded-full font-bold hover:shadow-lg transition-all duration-300 shadow-md hover:scale-110 active:scale-95">
                  📝 Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}