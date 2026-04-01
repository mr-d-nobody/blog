import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find(u => u.email === email)) {
      throw new Error('User already exists')
    }
    const newUser = { id: Date.now().toString(), name, email, password, bio: '' }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    const token = 'mock-token-' + newUser.id
    setToken(token)
    setUser({ id: newUser.id, name, email, bio: '' })
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify({ id: newUser.id, name, email, bio: '' }))
  }

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) {
      throw new Error('Invalid credentials')
    }
    const token = 'mock-token-' + user.id
    setToken(token)
    setUser({ id: user.id, name: user.name, email: user.email, bio: user.bio })
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify({ id: user.id, name: user.name, email: user.email, bio: user.bio }))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}