import { Card, Button, Typography, Input } from '@material-tailwind/react'
import { Form } from 'react-router-dom'
export default function SignupComponent() {
  return (
    <div className="min-w-fit w-full h-full md:w-[30%] flex-shrink ">
      <Card color="transparent" shadow={true} className="bg-white p-4 w-full">
        <Form className="mb-2" method="post">
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 mb-1 font-gotham-light">
            Welcome, please enter your details to continue.
          </Typography>
          <div className="mb-4 flex flex-col gap-6">
            <Input
              name="email"
              crossOrigin="anonymous"
              size="lg"
              label="Email"
              required
              type="email"
            />
            <Input
              name="password"
              crossOrigin="anonymous"
              size="lg"
              label="Password"
              required
              type="password"
            />
          </div>

          <Button className="mt-6" fullWidth type="submit">
            Submit
          </Button>
          <Typography
            color="gray"
            className="mt-4 text-center font-gotham-light">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-gray-900">
              Log In
            </a>
          </Typography>
        </Form>
      </Card>
    </div>
  )
}
