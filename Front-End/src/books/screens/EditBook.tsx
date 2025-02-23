import { useNavigate, useParams } from 'react-router'
import { IconFactory } from '../../shared/components/IconFactory'
import { Icon } from '../../shared/enums/icon.enum'
import { useEditBook } from '../hooks/useEditBook'
import { usePublishers } from '../../publishers/hooks/usePublishers'

export function EditBook() {
  const { bookId } = useParams()
  const {
    form,
    isLoadingForm,
    errorForm,
    message,
    isLoadingData,
    setAuthor,
    setIsbn,
    setPublicationYear,
    setPublisherId,
    setQuantity,
    setTitle,
    setPrice,
    submit,
  } = useEditBook({
    bookId: bookId ? Number(bookId) : undefined,
  })

  const { publishers, isLoading: isLoadingPublishers } = usePublishers()

  const navigate = useNavigate()

  if (isLoadingData)
    return (
      <div className="min-h-screen w-full flex items-center justify-center space-x-2">
        <IconFactory icon={Icon.LOADING} />
        <span>Loading data</span>
      </div>
    )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit()
  }

  const handleCancel = () => {
    const GO_BACK = -1
    void navigate(GO_BACK)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-md mx-auto p-4 border rounded-lg shadow-md"
        noValidate
      >
        <h2 className="text-2xl font-bold text-center mb-6">Edit Book</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={form.fields.title.value}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
          {form.fields.title.error && (
            <p className="text-red-500 text-sm">{form.fields.title.error}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">ISBN</label>
          <input
            type="text"
            value={form.fields.isbn.value}
            onChange={(e) => setIsbn(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
          {form.fields.isbn.error && (
            <p className="text-red-500 text-sm">{form.fields.isbn.error}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Author</label>
          <input
            type="text"
            value={form.fields.author.value}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
          {form.fields.author.error && (
            <p className="text-red-500 text-sm">{form.fields.author.error}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Publisher</label>
          {isLoadingPublishers ? (
            <IconFactory icon={Icon.LOADING} />
          ) : (
            <select
              className="w-full p-2 border border-gray-300 rounded mt-1"
              name="publishers"
              id="publishers"
              value={form.fields.publisherId.value}
              onChange={(e) => setPublisherId(+e.target.value)}
            >
              <option value={-1}>No select</option>
              {publishers?.map((publisher) => (
                <option key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </option>
              ))}
            </select>
          )}
          {form.fields.publisherId.error && (
            <p className="text-red-500 text-sm">
              {form.fields.publisherId.error}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Publication year</label>
          <input
            type="email"
            value={form.fields.publicationYear.value}
            onChange={(e) => setPublicationYear(+e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
          {form.fields.publicationYear.error && (
            <p className="text-red-500 text-sm">
              {form.fields.publicationYear.error}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="email"
            value={form.fields.quantity.value}
            onChange={(e) => setQuantity(+e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
          {form.fields.quantity.error && (
            <p className="text-red-500 text-sm">{form.fields.quantity.error}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="email"
            value={form.fields.price.value}
            onChange={(e) => setPrice(+e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
          {form.fields.price.error && (
            <p className="text-red-500 text-sm">{form.fields.price.error}</p>
          )}
        </div>

        {errorForm && (
          <p className="text-red-500 text-sm text-center">{errorForm}</p>
        )}
        {message && (
          <p className="text-green-500 text-sm text-center">{message}</p>
        )}

        <div className="flex justify-evenly">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer"
            disabled={isLoadingForm}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer"
            disabled={isLoadingForm}
          >
            {isLoadingForm ? <IconFactory icon={Icon.LOADING} /> : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}
