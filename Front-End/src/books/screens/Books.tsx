import { Link } from 'react-router'
import { ROUTES_PATH } from '../../shared/constants/routesPermissions'
import { IconFactory } from '../../shared/components/IconFactory'
import { Icon } from '../../shared/enums/icon.enum'
import { bookStatusToString } from '../utils/book.util'
import { useDashboardBook } from '../hooks/useDashboardBook'

export function Books() {
  const { books, idDeleting, deleteBook } = useDashboardBook()

  return (
    <main>
      <div className="p-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Book dashboard</h2>
          <Link
            to={ROUTES_PATH.books.add.absolute}
            className="bg-blue-500 text-white px-4 py-2 rounded flex gap-1 items-center"
          >
            <IconFactory icon={Icon.CREATE} />
            Add
          </Link>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100">
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Author</th>
              <th className="py-2 px-4 border-b">ISBN</th>
              <th className="py-2 px-4 border-b">Publication Year</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!books ? (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-500">
                  <IconFactory icon={Icon.LOADING} />
                </td>
              </tr>
            ) : !books.length ? (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-500">
                  No books found.
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{book.title}</td>
                  <td className="py-2 px-4 border-b">{book.author}</td>
                  <td className="py-2 px-4 border-b">{book.isbn}</td>
                  <td className="py-2 px-4 border-b">{book.publicationYear}</td>
                  <td className="py-2 px-4 border-b">{book.quantity}</td>
                  <td className="py-2 px-4 border-b">
                    {bookStatusToString(book.status)}
                  </td>
                  <td className="py-2 px-4 border-b flex space-x-4 justify-center">
                    {idDeleting && idDeleting === book.id ? (
                      <IconFactory icon={Icon.LOADING} />
                    ) : (
                      <>
                        <Link
                          to={ROUTES_PATH.books.edit.absolute(book.id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <IconFactory icon={Icon.EDIT} />
                        </Link>
                        <button
                          className="text-red-500 hover:text-red-700 hover:cursor-pointer"
                          onClick={() => void deleteBook(book.id)}
                        >
                          <IconFactory icon={Icon.DELETE} />
                        </button>
                      </>
                    )}
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
