import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom'; // Add this import

export function ErrorComponent({ message = '' }) {
  const navigate = useNavigate()

  const handleNavigateToSignup = () => {
    navigate('/signup')
  }

  return (
    <Card className="h-fit p-2">
      <CardBody>
        <div className="flex items-center gap-2 pb-2">
          <ExclamationCircleIcon className="w-10 h-10 p-0 stroke-red-500 fill-transparent" />

          <Typography
            variant="h3"
            color="red"
            className="inline-flex items-center">
            Error
          </Typography>
        </div>
        <Typography>
          Something went wrong, sorry for the inconvenience.
        </Typography>
        <Typography>
          {message}
        </Typography>
        <Button
          color="blue"
          className="mt-4"
          onClick={handleNavigateToSignup}
        >
          Try again
        </Button>
      </CardBody>
    </Card>
  )
}