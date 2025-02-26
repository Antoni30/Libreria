import { pool } from "../../db.js"; // Módulo de la base de datos
import * as userController from "../controller/users.controller.js"; // Asegúrate de importar correctamente tu controlador

jest.mock("../../db.js"); // Mocker la base de datos (pool.query)

describe("User Controller", () => {
  beforeEach(() => {
    // Reseteamos las implementaciones de los mocks antes de cada prueba.
    jest.resetAllMocks();
  });

  // 1. Prueba de `getUsers`
  test("should return list of users", async () => {
    // Preparamos el mock de `pool.query` para que devuelva una respuesta simulada.
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id_user_role: 1,
          user_fullname: "John Doe",
          user_email: "john.doe@example.com",
          user_password: "password123",
          user_phone: "123456789",
          user_registration_date: "2022-01-01T00:00:00.000Z",
          id_firebase: "firebase_id_123",
          id_user: 1,
        },
      ],
    });

    const req = {}; // Objeto de solicitud vacío, ya que no es necesario en este caso
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Llamamos a la función del controlador
    await userController.getUsers(req, res);

    // Comprobamos que la respuesta tiene el status 200
    expect(res.status).toHaveBeenCalledWith(200);
    // Comprobamos que el cuerpo de la respuesta es un array de usuarios
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          user_fullname: "John Doe",
          user_email: "john.doe@example.com",
        }),
      ])
    );
  });

  // 2. Prueba de `postUser`
  test("should add a new user", async () => {
    const newUser = {
      id_user_role: 1,
      user_fullname: "Jane Doe",
      user_email: "jane.doe@example.com",
      user_password: "newpassword123",
      user_phone: "987654321",
      id_firebase: "firebase_id_456",
    };

    // Simulamos la respuesta de `pool.query`
    pool.query.mockResolvedValueOnce({ rows: [] });

    const req = { body: newUser };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.postUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Add new USER",
    });
  });

  // 3. Prueba de `putUser`
  test("should update a user", async () => {
    const updatedUser = {
      id_user_role: 1,
      user_fullname: "John Doe Updated",
      user_password: "updatedpassword123",
      user_phone: "987654321",
    };

    pool.query.mockResolvedValueOnce({
      rows: [{ does_user_role_exist: true }],
    });

    const req = {
      params: { id: 1 },
      body: updatedUser,
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.putUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Update  data",
    });
  });

  // 4. Prueba de `deleteUser`
  test("should delete a user", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ does_user_role_exist: true }],
    });

    const req = { params: { id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Delete USER  with ID 1",
    });
  });

  // 5. Prueba de `getUserByID`
  test("should get a user by ID", async () => {
    const user = {
      id_user_role: 1,
      user_fullname: "John Doe",
      user_email: "john.doe@example.com",
      user_password: "password123",
      user_phone: "123456789",
      user_registration_date: "2022-01-01T00:00:00.000Z",
      id_firebase: "firebase_id_123",
      id_user: 1,
    };

    pool.query.mockResolvedValueOnce({
      rows: [user],
    });

    const req = { params: { id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.getUserByID(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  // 6. Prueba de `getUserByFirebaseID`
  test("should get a user by Firebase ID", async () => {
    const user = {
      id_user_role: 1,
      user_fullname: "John Doe",
      user_email: "john.doe@example.com",
      user_password: "password123",
      user_phone: "123456789",
      user_registration_date: "2022-01-01T00:00:00.000Z",
      id_firebase: "firebase_id_123",
      id_user: 1,
    };

    pool.query.mockResolvedValueOnce({
      rows: [user],
    });

    const req = { params: { id: "firebase_id_123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.getUserByFirebaseID(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  // 7. Prueba de `getBooksPurchasedByUser`
  test("should get books purchased by user", async () => {
    const books = [
      { book_id: 1, title: "Book 1" },
      { book_id: 2, title: "Book 2" },
    ];
    pool.query.mockResolvedValueOnce({
      rows: books,
    });

    const req = { params: { id_user: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.getBooksPurchasedByUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(books);
  });

  // 8. Prueba de `searchUser`
  test("should search a user", async () => {
    const user = {
      id_user_role: 1,
      user_fullname: "John Doe",
      user_email: "john.doe@example.com",
      user_password: "password123",
      user_phone: "123456789",
      user_registration_date: "2022-01-01T00:00:00.000Z",
      id_firebase: "firebase_id_123",
      id_user: 1,
    };

    pool.query.mockResolvedValueOnce({
      rows: [user],
    });

    const req = {
      body: { email: "john.doe@example.com", fullname: "John Doe" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.searchUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(user);
  });
});
