import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PostDetail() {
  const { id } = useParams()
  const { user, token } = useAuth()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]')
    const post = posts.find(p => p._id === id)
    setPost(post)

    const comments = JSON.parse(localStorage.getItem('comments') || '[]').filter(c => c.post === id)
    setComments(comments)

    setLoading(false)
  }, [id])

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      const comments = JSON.parse(localStorage.getItem('comments') || '[]')
      const newCommentObj = {
        _id: Date.now().toString(),
        content: newComment,
        author: { id: user.id, name: user.name, email: user.email },
        post: id,
        createdAt: new Date().toISOString(),
      }
      comments.push(newCommentObj)
      localStorage.setItem('comments', JSON.stringify(comments))
      setNewComment('')
      setComments([...comments.filter(c => c.post === id)])
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-300 border-t-blue-600"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center card-premium py-12 px-8">
          <div className="text-7xl mb-6 animate-bounce">😕</div>
          <h1 className="text-3xl font-bold text-gradient mb-3">Post not found</h1>
          <p className="text-gray-700 font-semibold">The post you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="card-premium overflow-hidden mb-10 animate-fadeInUp">
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-3"></div>
          <div className="p-10">
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {post.author ? post.author.name.charAt(0).toUpperCase() : '?'}
              </div>
              <div className="ml-5">
                <p className="font-bold text-gray-900 text-lg">{post.author ? post.author.name : 'Unknown Author'}</p>
                <p className="text-sm text-gray-500 font-medium">📅 {new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gradient mb-8 leading-tight">{post.title}</h1>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              {post.content.split('\n').map((line, index) => (
                <p key={index} className="text-lg">{line}</p>
              ))}
            </div>
          </div>
        </article>

        <div className="card-premium overflow-hidden animate-slideInLeft">
          <div className="p-10">
            <h2 className="text-3xl font-bold text-gradient mb-8 flex items-center gap-3">
              💬 Comments <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-lg font-bold">{comments.length}</span>
            </h2>
            {comments.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 animate-bounce">💭</div>
                <p className="text-gray-600 font-semibold text-lg">No comments yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="space-y-5 mb-10">
                {comments.map((comment) => (
                  <div key={comment._id} className="border-l-4 border-gradient-to-b from-blue-500 to-purple-500 pl-6 py-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-r-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {comment.author ? comment.author.name.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div className="ml-3">
                        <p className="font-bold text-gray-900">{comment.author ? comment.author.name : 'Anonymous'}</p>
                        <p className="text-xs text-gray-500 font-medium">⏰ {new Date(comment.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}

            {user ? (
              <form onSubmit={handleAddComment} className="space-y-5 pt-8 border-t-2 border-gray-200">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
                    💭 Add a Comment
                  </label>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="input-premium resize-none"
                    rows={5}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full flex justify-center items-center gap-2 py-4 uppercase font-bold tracking-wider"
                >
                  🚀 Post Comment
                </button>
              </form>
            ) : (
              <div className="text-center py-10 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                <p className="text-gray-700 font-bold text-lg mb-5">Want to join the conversation?</p>
                <a href="/login" className="btn-primary inline-flex items-center gap-2">
                  🔐 Login to Comment
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}