import { Button } from '@material-tailwind/react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/auth'

export default function GuestIndex() {
  const auth = useAuth()

  if (auth.authTokens) {
    return <Navigate to={`/users/${auth.user.user_id}/`} />
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center p-10 rounded-lg shadow-md bg-gray-100 dark:bg-gray-900 gap-10 h-full">
        <h1 className="text-4xl font-bold mb-4">Welcome to my app</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Please select an action
        </p>
        <div className="flex flex-row gap-10">
          <Link to={'/login'}>
            <Button className="w-auto px-8 py-3">Log In</Button>
          </Link>
          <Link to={'/signup'}>
            <Button className="w-auto px-8 py-3">Sign Up</Button>
          </Link>
        </div>
      </div>
    </>
  )
}
