/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useState } from "react"
import { FaShoppingCart, FaEye } from "react-icons/fa"
import { Link } from "react-router"
import { ROUTES_PATH } from "../../shared/constants/routesPermissions"

interface Book {
  id_book: number
  book_title: string
  book_publication_year: number
}

export function Store() {
  const [books, setBooks] = useState<Book[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState("All")
  const [years, setYears] = useState<number[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:2024/books")
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await response.json()
        setBooks(data)

        // Extraer años únicos y ordenarlos

        const uniqueYears = Array.from(new Set(data.map((book: Book) => book.book_publication_year)))
        uniqueYears.sort((a, b) => b - a) // Orden descendente
        setYears(uniqueYears)
      } catch (error) {
        console.error("Error fetching books:", error)
      }
    }
    void fetchBooks()
  }, [])

  // Filtrar libros según el término de búsqueda y el año seleccionado
  const filteredBooks = books.filter((book) =>
    book.book_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedYear === "All" || book.book_publication_year === Number(selectedYear))
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and Controls */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">BOOKS</h1>
        <div className="flex gap-4 items-center">
          <input
            type="search"
            placeholder="Search books..."
            className="border border-gray-300 rounded px-4 py-2 flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Filtro por Año */}
          <select
            className="border border-gray-300 rounded px-3 py-2 w-32"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="All">All</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id_book} className="border border-gray-200 rounded-lg p-4 flex flex-col">
            <img
              src="https://st1.uvnimg.com/dims4/default/4e755fc/2147483647/thumbnail/400x225/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fassets%2Fvixes%2Fl%2Flibros-2_3.jpg"
              alt={book.book_title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-center mb-2">
              {book.book_title} - {book.book_publication_year}
            </h3>
            <div className="mt-auto flex justify-center gap-4">

            <Link
                          to={ROUTES_PATH.store.view.absolute(
                            parseInt(book.id_book.toString())
                          )}
                          className="text-gray-600 hover:text-gray-800 transition-colors"
                        >
                           <FaEye size={24} />
                    </Link>


              <button className="text-gray-600 hover:text-gray-800 transition-colors">
                <FaShoppingCart size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
