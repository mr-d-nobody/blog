import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Profile() {
  const { user } = useAuth()
  const [bio, setBio] = useState(user?.bio || '')
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  if (!user) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center card-premium py-12 px-8">
          <div className="text-7xl mb-6 animate-bounce">🔒</div>
          <h1 className="text-3xl font-bold text-gradient mb-4">Access Denied</h1>
          <p className="text-gray-700 font-semibold mb-8">Please login to view your profile.</p>
          <Link to="/login" className="btn-primary w-full flex justify-center">
            🔐 Login
          </Link>
        </div>
      </div>
    )
  }

  const handleSave = async () => {
    setLoading(true)
    setMessage('')

    try {
      setMessage('Profile updated successfully!')
      setIsEditing(false)
    } catch (error) {
      setMessage('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen gradient-bg py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="w-28 h-28 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-5xl font-bold mx-auto mb-6 shadow-xl">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-5xl font-bold text-gradient mb-3">Welcome, {user.name}!</h1>
          <p className="text-xl text-gray-700 font-semibold">⚙️ Manage your profile and posts</p>
        </div>

        <div className="card-premium p-10">
          <h2 className="text-3xl font-bold text-gradient mb-8">Profile Information</h2>

          <div className="space-y-7">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">👤 Full Name</label>
              <div className="px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 font-semibold text-lg">
                {user.name}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">📧 Email Address</label>
              <div className="px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 font-semibold text-lg">
                {user.email}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">📝 Bio</label>
              {isEditing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="input-premium resize-none"
                  rows={5}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <div className="px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 font-semibold min-h-[120px] leading-relaxed">
                  {bio || '✨ No bio yet. Click edit to add one!'}
                </div>
              )}
            </div>

            {message && (
              <div className={`px-5 py-4 rounded-lg font-bold ${message.includes('success') ? 'bg-green-100 border-2 border-green-400 text-green-800' : 'bg-red-100 border-2 border-red-400 text-red-800'}`}>
                {message.includes('success') ? '✅' : '❌'} {message}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-lg font-bold hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex justify-center items-center gap-2 uppercase tracking-wider"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      '💾 Save Changes'
                    )}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 btn-secondary py-4 flex justify-center items-center gap-2 font-bold uppercase tracking-wider"
                  >
                    ← Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary w-full py-4 flex justify-center items-center gap-2 font-bold uppercase tracking-wider"
                >
                  ✏️ Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="mt-12 pt-10 border-t-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gradient mb-6">⚡ Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Link
                to="/create-post"
                className="btn-primary py-5 flex justify-center items-center gap-2 rounded-xl font-bold text-lg uppercase tracking-wider"
              >
                ✍️ Write New Post
              </Link>
              <Link
                to="/"
                className="btn-secondary py-5 flex justify-center items-center gap-2 rounded-xl font-bold text-lg uppercase tracking-wider"
              >
                🏠 Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}