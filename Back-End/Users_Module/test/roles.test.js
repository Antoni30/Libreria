// roles.test.js

import { getRoleById } from "../utils/roles";

describe("Pruebas para getRoleById", () => {
  it("debería devolver el rol con id 1", () => {
    const result = getRoleById(1);
    expect(result).toEqual({ id: 1, name: "Admin" });
  });

  it("debería devolver undefined cuando el rol no existe", () => {
    const result = getRoleById(999);
    expect(result).toBeUndefined();
  });
});
