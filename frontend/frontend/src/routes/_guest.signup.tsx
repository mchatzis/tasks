import { useActionData } from 'react-router-dom'
import { ErrorComponent } from '../components/Error'
import SignupComponent from '../components/Signup'
import ThankYou from '../components/ThankYou'

export default function Signup() {
  const actionData = useActionData()

  let content
  if (actionData) {
    if (actionData.success) {
      content = <ThankYou />
    } else {
      content = <ErrorComponent message={actionData.error} />
    }
  } else {
    content = <SignupComponent />
  }

  return (
    <div className="flex flex-wrap justify-around p-10 gap-10 bg-gray-100 w-full h-full">
      {content}
    </div>
  )
}
