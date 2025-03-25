import { Button, Card, Input, Typography } from '@material-tailwind/react'
import { Form } from 'react-router-dom'

export default function LoginComponent({ actionData }) {
  return (
    <div className="min-w-fit w-full h-fit md:w-[30%] flex-shrink bg-gray-100">
      <Card color="transparent" shadow={true} className="bg-white p-5 w-full">
        <Typography variant="h4" color="blue-gray">
          Welcome
        </Typography>
        <Typography color="gray" className="mt-1 font-gotham-light">
          Log in to your account to continue.
        </Typography>
        <Form method="post" action="/login" className="mt-8 mb-2">
          <div className="mb-4 flex flex-col gap-6">
            <span className="text-red-500">
              {actionData && actionData.detail}
            </span>

            <Input
              name="email"
              crossOrigin="anonymous"
              size="lg"
              label="email"
              required
            />

            <Input
              crossOrigin="anonymous"
              type="password"
              size="lg"
              label="password"
              name="password"
              title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character."
              required
            />
          </div>
          <Button
            className="mt-6 normal-case text-sm shadow-sm"
            fullWidth
            type="submit">
            Log in
          </Button>
          <Typography
            color="gray"
            className="mt-4 text-center font-gotham-light">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-gray-900">
              Sign Up
            </a>
          </Typography>
        </Form>
      </Card>
    </div>
  )
}
