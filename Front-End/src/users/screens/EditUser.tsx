import { useNavigate, useParams } from "react-router-dom";
import { useFetchUser } from "../hooks/useFetchUser";
import { useEditUser } from "../hooks/useEditUser";
import { Icon } from "../../shared/enums/icon.enum";
import { IconFactory } from "../../shared/components/IconFactory";

export function EditUser() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const { user, setUser, loading: fetching, error } = useFetchUser(userId);
  const { updateUser, loading, message } = useEditUser(userId, user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!user) return;
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return; 
    void updateUser();
  };

  const handleCancel = () => {
    void navigate(-1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-xl font-bold mb-4">Edit User</h1>

        {error && <p className="text-red-500">{error}</p>}
        {message && <p className={message === "Edit Successful" ? "text-green-500" : "text-red-500"}>{message}</p>}

        {fetching ? (
          <p className="text-gray-500">Loading...</p>
        ) : user ? ( // ✅ Manejo correcto cuando `user` es null
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              name="user_fullname"
              value={user.user_fullname}
              onChange={handleChange}
              className="border rounded w-full p-2 mb-4"
            />

            <label className="block mb-2">Phone Number</label>
            <input
              type="text"
              name="user_phone"
              value={user.user_phone}
              onChange={handleChange}
              className="border rounded w-full p-2 mb-4"
            />

            <label className="block mb-2">Password</label>
            <input
              type="password"
              name="user_password"
              value={user.user_password}
              onChange={handleChange}
              className="border rounded w-full p-2 mb-4"
            />

            <label className="block mb-2">Role</label>
            <select
              name="id_user_role"
              value={user.id_user_role}
              onChange={handleChange}
              className="border rounded w-full p-2 mb-4"
            >
              <option value="1">Admin</option>
              <option value="2">Bibliotecario</option>
              <option value="3">Cliente</option>
            </select>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500 w-1/2 mr-2"
                disabled={loading}
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300 w-1/2"
              >
                {loading ? <IconFactory icon={Icon.LOADING} /> : "Update User"}
              </button>
            </div>
          </form>
        ) : (
          <p className="text-red-500">User not found</p>
        )}
      </div>
    </div>
  );
}
