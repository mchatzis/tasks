import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import Confetti from 'react-confetti'

export default function ThankYou() {
  return (
    <>
      <Confetti recycle={false} numberOfPieces={1000} />
      <div className="flex flex-col items-center justify-center h-fit p-10 rounded-lg shadow-md bg-gray-100 dark:bg-gray-900">
        <h1 className="text-4xl font-bold mb-4">Success</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Thank you for using our services, log into your account clicking the
          button below
        </p>
        <Link to={'/login'}>
          <Button className="w-auto px-8 py-3">Log In</Button>
        </Link>
      </div>
    </>
  )
}
