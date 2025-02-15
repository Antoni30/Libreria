import { Link } from 'react-router'
import { useLogin } from '../hooks/useLogin'

export function Login() {
  const { form, error, isLoading, setEmail, setPassword, submit } = useLogin()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit()
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {error && (
            <p className="block text-center text-red-500 text-sm mt-1">
              {error}
            </p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={form.fields.email.text}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                form.fields.email.error ? 'border-red-500' : ''
              }`}
            />
            {form.fields.email.error && (
              <p className="text-red-500 text-xs mt-1">
                {form.fields.email.error}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={form.fields.password.text}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                form.fields.password.error ? 'border-red-500' : ''
              }`}
            />
            {form.fields.password.error && (
              <p className="text-red-500 text-xs mt-1">
                {form.fields.password.error}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
            onClick={submit}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            {`Don't have an account? `}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}
