import { Link } from 'react-router'
import { IconFactory } from '../../shared/components/IconFactory'
import { Icon } from '../../shared/enums/icon.enum'
import { usePublishers } from '../hooks/usePublishers'
import { ROUTES_PATH } from '../../shared/constants/routesPermissions'

export function Publishers() {
  const { publishers, isLoading, deletePublisher } = usePublishers()

  return (
    <main>
      <div className="p-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Publisher dashboard</h2>
          <Link
            to="/publishers/add"
            className="bg-blue-500 text-white px-4 py-2 rounded flex gap-1 items-center"
          >
            <IconFactory icon={Icon.CREATE} />
            Add
          </Link>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  Loading publshers...
                </td>
              </tr>
            ) : !publishers.length ? (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No publishers found.
                </td>
              </tr>
            ) : (
              publishers.map((publisher) => (
                <tr key={publisher.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{publisher.name}</td>
                  <td className="py-2 px-4 border-b">{publisher.address}</td>
                  <td className="py-2 px-4 border-b">{publisher.phone}</td>
                  <td className="py-2 px-4 border-b">{publisher.email}</td>
                  <td className="py-2 px-4 border-b flex space-x-4">
                    <Link
                      to={ROUTES_PATH.publishers.edit.absolute(publisher.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <IconFactory icon={Icon.EDIT} />
                    </Link>
                    <button
                      className="text-red-500 hover:text-red-700 hover:cursor-pointer"
                      onClick={() => deletePublisher(publisher.id)}
                    >
                      <IconFactory icon={Icon.DELETE} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}
