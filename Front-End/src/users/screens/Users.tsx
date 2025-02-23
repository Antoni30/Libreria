import { useState, useEffect, useCallback } from "react";
import type { User } from "../types/types";

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState<"email" | "fullname">("email");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch("http://localhost:2028/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data: User[] = await response.json();
      setUsers(Array.isArray(data) ? data : []);
      setFilteredUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      setError("Error fetching users");
      console.error("Error fetching users:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    let filtered = users;
    if (searchTerm) {
      filtered = filtered.filter(user =>
        searchBy === "email"
          ? user.user_email.toLowerCase().includes(searchTerm.toLowerCase())
          : user.user_fullname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (roleFilter) {
      filtered = filtered.filter(user => user.id_user_role.toString() === roleFilter);
    }
    setFilteredUsers(filtered);
  }, [searchTerm, searchBy, roleFilter, users]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex justify-between mb-6">
        <div className="flex gap-2">
          <select
            className="border rounded px-3 py-2"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value as "email" | "fullname")}
          >
            <option value="email">Email</option>
            <option value="fullname">Fullname</option>
          </select>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-3 py-2 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="1">Admin</option>
            <option value="2">Bibliotecario</option>
            <option value="3">Cliente</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Fullname</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Phone Number</th>
              <th className="border px-4 py-2 text-left">Role</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id_firebase} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{user.id_user}</td>
                  <td className="border px-4 py-2">{user.user_fullname}</td>
                  <td className="border px-4 py-2">{user.user_email}</td>
                  <td className="border px-4 py-2">{user.user_phone}</td>
                  <td className="border px-4 py-2">{user.id_user_role === 1 ? "Admin" : user.id_user_role === 2 ? "Bibliotecario" : "Cliente"}</td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-2">
                      <button className="text-blue-500 hover:underline">update</button>
                      <button className="text-red-500 hover:underline">delete</button>
                      <button className="text-gray-500 hover:underline">details</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="border px-4 py-2 text-center">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
