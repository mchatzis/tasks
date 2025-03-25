import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import App from './App.tsx'
import './index.css'

import { ThemeProvider } from '@material-tailwind/react'
import { loginAction } from './actions/_guest.login_actions.tsx'
import { signupAction } from './actions/_guest.signup_actions.tsx'
import NotFound from './components/NotFound.tsx'
import { AuthProvider } from './hooks/auth.tsx'
import { UserLoader } from './loaders/user.tsx'
import Guest from './routes/_guest._index.tsx'
import Login from './routes/_guest.login.tsx'
import Signup from './routes/_guest.signup.tsx'
import { ProtectedRoute } from './routes/_private._index.tsx'
import UserProfile from './routes/_private.user.$uuid.tsx'

function Routes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/" index element={<Guest />} />
        <Route path="/login" element={<Login />} action={loginAction} />
        <Route path="/signup" element={<Signup />} action={signupAction} />
        <Route key="/users" path="users" element={<ProtectedRoute />}>
          <Route
            index
            key="/users/index"
            path=":uuid"
            element={<UserProfile />}
            loader={UserLoader}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  </AuthProvider>
)
