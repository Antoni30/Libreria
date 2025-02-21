import { useNavigate, useParams } from 'react-router'
import { useEditPublisher } from '../hooks/useEditPublisher'
import { IconFactory } from '../../shared/components/IconFactory'
import { Icon } from '../../shared/enums/icon.enum'

export function EditPublisher() {
  const { publisherId } = useParams()
  const navigate = useNavigate()

  const {
    form,
    isLoadingForm,
    errorForm,
    message,
    isLoadingData,
    setAddress,
    setPhone,
    setEmail,
    submit,
  } = useEditPublisher({
    publisherId: publisherId ? Number(publisherId) : undefined,
  })

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

  const goBack = () => {
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
        <h2 className="text-2xl font-bold text-center mb-6">Edit Publisher</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={form.fields.name.value}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            value={form.fields.address.value}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
          {form.fields.address.error && (
            <p className="text-red-500 text-sm">{form.fields.address.error}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            value={form.fields.phone.value}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
          {form.fields.phone.error && (
            <p className="text-red-500 text-sm">{form.fields.phone.error}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={form.fields.email.value}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
          {form.fields.email.error && (
            <p className="text-red-500 text-sm">{form.fields.email.error}</p>
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
            onClick={goBack}
          >
            Cancelar
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
