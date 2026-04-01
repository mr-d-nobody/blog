import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { user, token } = useAuth()
  const navigate = useNavigate()

  if (!token) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center card-premium py-12 px-8">
          <div className="text-7xl mb-6 animate-bounce">🔒</div>
          <h1 className="text-3xl font-bold text-gradient mb-4">Access Denied</h1>
          <p className="text-gray-700 font-semibold mb-8">Please login to create a post.</p>
          <Link to="/login" className="btn-primary w-full flex justify-center">
            🔐 Login
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const posts = JSON.parse(localStorage.getItem('posts') || '[]')
      const newPost = {
        _id: Date.now().toString(),
        title,
        content,
        author: { id: user.id, name: user.name, email: user.email },
        createdAt: new Date().toISOString(),
      }
      posts.unshift(newPost)
      localStorage.setItem('posts', JSON.stringify(posts))
      navigate('/')
    } catch (error) {
      setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen gradient-bg py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="text-7xl mb-6">✍️</div>
          <h1 className="text-5xl font-bold text-gradient mb-3">Create New Post</h1>
          <p className="text-xl text-gray-700 font-semibold">📝 Share your thoughts with the world</p>
        </div>

        <div className="card-premium p-10 animate-slideInLeft">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="title" className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
                📌 Post Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-premium"
                placeholder="Enter an engaging title..."
                required
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
                📄 Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="input-premium resize-none"
                rows={14}
                placeholder="Write your story here..."
                required
              />
            </div>
            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-800 px-5 py-4 rounded-lg font-semibold">
                ❌ {error}
              </div>
            )}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary flex justify-center items-center gap-2 py-4 uppercase font-bold tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                ) : (
                  '📝 Publish Post'
                )}
              </button>
              <Link
                to="/"
                className="flex-1 btn-secondary flex justify-center items-center gap-2 py-4 uppercase font-bold tracking-wider"
              >
                ← Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}