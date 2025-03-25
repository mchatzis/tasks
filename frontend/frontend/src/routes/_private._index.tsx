import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/auth'

export const ProtectedRoute = () => {
  const auth = useAuth()
  let location = useLocation()
  // Check if the user is authenticated
  if (!auth.authTokens) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" state={{ from: location }} replace />
  }


  // If authenticated, render the child routes
  return <Outlet />
}
