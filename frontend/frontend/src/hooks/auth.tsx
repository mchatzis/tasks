import { jwtDecode } from 'jwt-decode';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AuthContextType, AuthTokens } from '../types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() => {
    const item = localStorage.getItem('authTokens')
    return item ? JSON.parse(item) : null
  })

  const [user, setUser] = useState(() => {
    const item = localStorage.getItem('authTokens')
    return item ? jwtDecode(item) : null
  })

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access))
    }
  }, [authTokens])

  const loginUser = (data: AuthTokens) => {
    setAuthTokens(data)
    const user = jwtDecode(data.access)
    setUser(user)
    localStorage.setItem('authTokens', JSON.stringify(data))
  }

  const logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
  }

  const contextData: AuthContextType = {
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  }

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
