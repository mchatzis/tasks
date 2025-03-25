import { makeApiRequest } from '../utils/apiRequests'

export const signupAction = async ({ request }) => {
  const data = await request.formData()
  const submission = {
    email: data.get('email'),
    password: data.get('password'),
  }
  try {
    const response = await makeApiRequest({
      method: request.method,
      url: 'http://localhost:8000/users/',
      data: submission,
    })
    if (!response.ok) {
      const content = await response.json()
      return { error: JSON.stringify(content) }
    }
    return await { success: response.json() }
  } catch (error) {
    return { error: error.message }
  }
}
