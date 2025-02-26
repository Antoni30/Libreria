import * as firebaseController from "../controller/firbase.controller.js"; // Ajusta la ruta si es necesario
import { auth } from "../firebaseAdmin.js"; // Importa el objeto `auth` que has configurado

jest.mock("../firebaseAdmin"); // Mocks para el módulo de Firebase Admin

describe("Firebase Controller", () => {
  beforeEach(() => {
    // Reseteamos las implementaciones de los mocks antes de cada prueba.
    jest.resetAllMocks();
  });

  // 1. Prueba de `deleteEmail`
  test("should delete user successfully", async () => {
    const uid = "some-uid";

    // Simulamos la función `deleteUser` de Firebase para que no haga nada (simulación exitosa)
    auth.deleteUser.mockResolvedValueOnce(); // Simula una respuesta exitosa

    const req = { params: { uid } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Llamamos a la función del controlador
    await firebaseController.deleteEmail(req, res);

    // Verificamos que la respuesta tenga el status 200 y el mensaje correcto
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "User deleted successfully",
    });
  });

  // 2. Prueba de `deleteEmail` cuando ocurre un error
  test("should handle error when deleting user", async () => {
    const uid = "some-uid";

    // Simulamos un error en `deleteUser` de Firebase
    auth.deleteUser.mockRejectedValueOnce(new Error("Firebase error"));

    const req = { params: { uid } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Llamamos a la función del controlador
    await firebaseController.deleteEmail(req, res);

    // Verificamos que la respuesta tenga el status 500 y el mensaje de error correcto
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ error: "Error deleting user" });
  });

  // 3. Prueba de `updatePassword`
  test("should update password successfully", async () => {
    const uid = "some-uid";
    const newPassword = "newPassword123";

    // Simulamos la función `updateUser` de Firebase para que no haga nada (simulación exitosa)
    auth.updateUser.mockResolvedValueOnce(); // Simula una respuesta exitosa

    const req = {
      params: { uid },
      body: { newPassword },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Llamamos a la función del controlador
    await firebaseController.updatePassword(req, res);

    // Verificamos que la respuesta tenga el status 200 y el mensaje correcto
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "Password updated successfully",
    });
  });

  // 4. Prueba de `updatePassword` cuando ocurre un error
  test("should handle error when updating password", async () => {
    const uid = "some-uid";
    const newPassword = "newPassword123";

    // Simulamos un error en `updateUser` de Firebase
    auth.updateUser.mockRejectedValueOnce(new Error("Firebase error"));

    const req = {
      params: { uid },
      body: { newPassword },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Llamamos a la función del controlador
    await firebaseController.updatePassword(req, res);

    // Verificamos que la respuesta tenga el status 500 y el mensaje de error correcto
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ error: "Error updating password" });
  });
});
