/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function useEditUser(userId: string | undefined, user: any) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const updateUser = async () => {
    if (!userId) return;
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch(`http://localhost:2028/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, id_user: userId }),
      });

      const responseFB = await fetch(`http://localhost:2028/firebase/update-password/${user.user_UI}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: user.user_password }),
      });

      if (!response.ok && !responseFB.ok) throw new Error("Failed to update user");

      setMessage("Edit Successful");

      // Mantiene el ícono de carga y luego regresa a la pantalla anterior
      setTimeout(() => {
        setLoading(false);
        void navigate("/users", { replace: true });
      }, 1500);
      
    } catch (error) {
      setMessage("Failed to Edit");
      console.error("Error updating user:", error);
      setLoading(false);
    }
  };

  return { updateUser, loading, message };
}
