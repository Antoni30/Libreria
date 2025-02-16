import { Link } from 'react-router'
import { useRegister } from '../hooks/useRegister'
import { ROUTES_PATH } from '../../shared/constants/routesPermissions'
import { IconFactory } from '../../shared/components/IconFactory'
import { Icon } from '../../shared/enums/icon.enum'

export function Register() {
  const {
    form,
    message,
    isLoading,
    error,
    setFullname,
    setEmail,
    setPhoneNumber,
    setPassword,
    submit,
  } = useRegister()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit()
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {message && (
            <p className="block text-center text-green-500 text-sm mt-1">
              {message}
            </p>
          )}
          {error && (
            <p className="block text-center text-red-500 text-sm mt-1">
              {error}
            </p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={form.fields.fullname.text}
              onChange={(e) => setFullname(e.target.value)}
              required
              className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                form.fields.fullname.error ? 'border-red-500' : ''
              }`}
              placeholder="John Doe"
            />
            {form.fields.fullname.error && (
              <p className="text-red-500 text-xs mt-1">
                {form.fields.fullname.error}
              </p>
            )}
          </div>
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
              placeholder="johndoe@email.com"
            />
            {form.fields.email.error && (
              <p className="text-red-500 text-xs mt-1">
                {form.fields.email.error}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              value={form.fields.phoneNumber.text}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                form.fields.phoneNumber.error ? 'border-red-500' : ''
              }`}
              placeholder="0987654321"
            />
            {form.fields.phoneNumber.error && (
              <p className="text-red-500 text-xs mt-1">
                {form.fields.phoneNumber.error}
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
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isLoading ? <IconFactory icon={Icon.LOADING} /> : 'Register'}
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            {`Already have an account? `}
            <Link
              to={ROUTES_PATH.login.absolute}
              className="text-blue-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}
