/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, useEffect } from "react";

interface User {
  id_user_role: number;
  user_fullname: string;
  user_password: string;
  user_UI: string;
  user_phone: string;
}

export function useFetchUser(userId: string | undefined) {
  const [user, setUser] = useState<User | null>(null); // ✅ Permitir null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:2028/users/users_ID/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        setUser({
          id_user_role: data.id_user_role,
          user_fullname: data.user_fullname,
          user_password: data.user_password,
          user_UI: data.id_firebase,
          user_phone: data.user_phone,
        });
      } catch (error) {
        setError("Failed to fetch user");
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    void fetchUser();
  }, [userId]);

  return { user, setUser, loading, error };
}
