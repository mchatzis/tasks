import { useActionData, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/auth'
import { jwtDecode } from 'jwt-decode'
import LoginComponent from '../components/Login'
import { ErrorComponent } from '../components/Error'
import { useEffect } from 'react'

export default function Login() {
  const auth = useAuth()
  const navigate = useNavigate()
  const actionData = useActionData()

  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        auth.loginUser(actionData.success)
        const user = jwtDecode(actionData.success.access)
        navigate(`/users/${user.user_id}/`, { replace: true })
      }
    }
  }, [actionData])

  let content
  if (actionData) {
    if (actionData.error) {
      content = <ErrorComponent />
    } else {
      content = <LoginComponent actionData={actionData} />
    }
  } else {
    content = <LoginComponent actionData={actionData} />
  }

  return (
    <div className="flex justify-center p-10 gap-10 bg-gray-100 w-full h-full">
      {content}
    </div>
  )
}
