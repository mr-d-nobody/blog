import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]')
    setPosts(storedPosts)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="animate-glow">
          <div className="text-7xl mb-4">✨</div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-300 border-t-blue-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <h1 className="text-6xl font-bold text-gradient mb-6">Welcome to BlogHub</h1>
          <p className="text-2xl text-gray-700 font-semibold">✨ Discover amazing stories and share your thoughts</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 card-premium mx-auto max-w-md">
            <div className="text-8xl mb-6 animate-bounce">📝</div>
            <p className="text-gray-600 text-xl font-semibold mb-6">No posts yet. Be the first to share your story!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <article key={post._id} className="card-premium overflow-hidden animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-2"></div>
                <div className="p-7">
                  <div className="flex items-center mb-5">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {post.author ? post.author.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div className="ml-4">
                      <p className="font-bold text-gray-900 text-lg">{post.author ? post.author.name : 'Unknown'}</p>
                      <p className="text-sm text-gray-500 font-medium">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight">
                    <Link to={`/posts/${post._id}`} className="text-gradient hover:opacity-80 transition-opacity">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed font-medium">
                    {post.content.substring(0, 150)}...
                  </p>
                  <Link
                    to={`/posts/${post._id}`}
                    className="inline-flex items-center text-gradient font-bold hover:opacity-80 transition-all duration-300 text-lg"
                  >
                    Read more <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}