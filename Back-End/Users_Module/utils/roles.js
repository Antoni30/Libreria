// roles.js

export const getRoleById = (id) => {
  const roles = [
    { id: 1, name: "Admin" },
    { id: 2, name: "User" },
  ];
  return roles.find((role) => role.id === id);
};
