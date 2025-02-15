import { Link } from 'react-router'

export function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">404 Not Found</h2>
        <p className="text-gray-700 mb-6">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          replace
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}
