import { pool } from "../../db";
import {
  deleteRoles,
  getRoles,
  postRoles,
  putRoles,
} from "../controller/user_roles.controller";
import User_Role from "../model/User_Role";

jest.mock("../../db"); // Hacemos mock de la base de datos

describe("Pruebas para el controlador de roles", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpiamos mocks antes de cada prueba
  });

  describe("getRoles", () => {
    it("debería devolver los roles correctamente", async () => {
      // Simulamos una respuesta de la base de datos
      const mockRoles = [
        { id_user_role: 1, user_role_name: "Admin" },
        { id_user_role: 2, user_role_name: "User" },
      ];
      pool.query.mockResolvedValueOnce({ rows: mockRoles });

      const req = {}; // No estamos usando el objeto de solicitud
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getRoles(req, res);

      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM get_data_roles()");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        new User_Role("Admin", 1),
        new User_Role("User", 2),
      ]);
    });

    it("debería manejar errores correctamente", async () => {
      pool.query.mockRejectedValueOnce(new Error("Database error"));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getRoles(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server Error 🛠️⚙️",
        error: "Database error",
      });
    });
  });

  describe("postRoles", () => {
    it("debería agregar un nuevo rol correctamente", async () => {
      const req = {
        body: { user_role_name: "New Role" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      pool.query.mockResolvedValueOnce();

      await postRoles(req, res);

      expect(pool.query).toHaveBeenCalledWith("call insert_data($1)", [
        "New Role",
      ]);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Add new Role",
      });
    });

    it("debería devolver error si falta el campo user_role_name", async () => {
      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await postRoles(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Missing required field: user_role_name",
      });
    });

    it("debería manejar errores correctamente", async () => {
      const req = {
        body: { user_role_name: "New Role" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      pool.query.mockRejectedValueOnce(new Error("Database error"));

      await postRoles(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server Error 🛠️⚙️",
        error: "Database error",
      });
    });
  });

  describe("deleteRoles", () => {
    it("debería eliminar un rol si existe", async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      pool.query.mockResolvedValueOnce({
        rows: [{ does_user_role_exist: true }],
      });
      pool.query.mockResolvedValueOnce();

      await deleteRoles(req, res);

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT does_user_role_exist($1)",
        [1]
      );
      expect(pool.query).toHaveBeenCalledWith("call delete_data($1)", [1]);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Delete role  with ID 1",
      });
    });

    it("debería devolver error si el rol no existe", async () => {
      const req = { params: { id: 999 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      pool.query.mockResolvedValueOnce({
        rows: [{ does_user_role_exist: false }],
      });

      await deleteRoles(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Role with ID 999 does not exists.",
      });
    });

    it("debería manejar errores correctamente", async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      pool.query.mockRejectedValueOnce(new Error("Database error"));

      await deleteRoles(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server Error 🛠️⚙️",
        error: "Database error",
      });
    });
  });

  describe("putRoles", () => {
    it("debería actualizar un rol si existe", async () => {
      const req = {
        params: { id: 1 },
        body: { user_role_name: "Updated Role" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      pool.query.mockResolvedValueOnce({
        rows: [{ does_user_role_exist: true }],
      });
      pool.query.mockResolvedValueOnce();

      await putRoles(req, res);

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT does_user_role_exist($1)",
        [1]
      );
      expect(pool.query).toHaveBeenCalledWith("call update_data($1,$2)", [
        1,
        "Updated Role",
      ]);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Update data",
      });
    });

    it("debería devolver error si el rol no existe", async () => {
      const req = {
        params: { id: 999 },
        body: { user_role_name: "Updated Role" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      pool.query.mockResolvedValueOnce({
        rows: [{ does_user_role_exist: false }],
      });

      await putRoles(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Role with ID 999 does not exists.",
      });
    });

    it("debería manejar errores correctamente", async () => {
      const req = {
        params: { id: 1 },
        body: { user_role_name: "Updated Role" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      pool.query.mockRejectedValueOnce(new Error("Database error"));

      await putRoles(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server Error 🛠️⚙️",
        error: "Database error",
      });
    });
  });
});
