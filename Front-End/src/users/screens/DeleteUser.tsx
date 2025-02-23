/* eslint-disable @typescript-eslint/no-misused-promises */
import { useNavigate, useParams } from "react-router-dom";
import { useFetchUser } from "../hooks/useFetchUser";
import { useDeleteUser } from "../hooks/useDeleteUser";

export function DeleteUser() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  // Hook para obtener datos del usuario
  const { user, setUser, loading, error } = useFetchUser(userId);

  // Hook para eliminar usuario
  const { handleDelete, deleting, error: deleteError } = useDeleteUser(userId, setUser, navigate,user?.user_UI);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-xl font-bold mb-4">Delete User</h1>
        {error && <p className="text-red-500">{error}</p>}
        {deleteError && <p className="text-red-500">{deleteError}</p>}

        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <>
            <p className="mb-2"><strong>Name:</strong> {user.user_fullname}</p>
            <p className="mb-4"><strong>Phone:</strong> {user.user_phone}</p>
            <p className="mb-4 text-red-500">Are you sure you want to delete this user?</p>

            <div className="flex justify-between">
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500 w-1/2 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 disabled:bg-red-300 w-1/2"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </>
        ) : (
          <p className="text-red-500">User not found</p>
        )}
      </div>
    </div>
  );
}
