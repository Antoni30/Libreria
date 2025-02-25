/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface BookDetails {
  id_book: number;
  id_publisher: number;
  book_title: string;
  book_author: string;
  book_isbn: string;
  book_publication_year: number;
  book_quantity_available: number;
  book_status: string;
  book_cover_image: string;
  book_price: string;
}

interface Category {
  id_category: number;
  category_name: string;
}

interface Publisher {
  message: string;
  data: {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
  };
}

export function InfoBooks() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookRes = await fetch(`http://localhost:2024/books/${id}`);
        const bookData = await bookRes.json();
        setBook(bookData);

        const categoriesRes = await fetch(`http://localhost:2024/books/${id}/categories`);
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);

        if (bookData.id_publisher) {
          const publisherRes = await fetch(`http://localhost:2030/publishers/${bookData.id_publisher}`);
          const publisherData = await publisherRes.json();
          setPublisher(publisherData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    void fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!book) {
    return <div className="text-center p-8">Book not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Book Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Book Cover */}
        <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-center">
          <img
            src="https://st1.uvnimg.com/dims4/default/4e755fc/2147483647/thumbnail/400x225/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fassets%2Fvixes%2Fl%2Flibros-2_3.jpg"
            alt={book.book_title}
            className="w-full h-48 object-cover rounded-md mb-4"
            width={300}
            height={400}
          />
        </div>

        {/* Book Information */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Book Name</h2>
            <p className="text-lg">{book.book_title}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Author</h2>
            <p className="text-lg">{book.book_author}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">ISBN</h2>
            <p className="text-lg">{book.book_isbn}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Publication Year</h2>
            <p className="text-lg">{book.book_publication_year}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Publisher</h2>
            <p className="text-lg">{publisher?.data.name ?? "Unknown"}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Category</h2>
            <div className="flex gap-2 flex-wrap">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <span key={category.id_category} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {category.category_name}
                  </span>
                ))
              ) : (
                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-500">None</span>
              )}
            </div>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="bg-gray-100 p-6 rounded-lg h-fit">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Price</h2>
            <p className="text-xl">${book.book_price}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Stock</h2>
            <p className="text-xl">{book.book_quantity_available} Units</p>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-white border-2 border-black py-2 px-4 rounded hover:bg-gray-50 transition-colors">
              Add to Cart
            </button>
            <button className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
