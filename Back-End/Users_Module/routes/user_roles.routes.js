import { Router } from "express";
import { getRoles, postRoles, putRoles,deleteRoles } from "../controller/user_roles.controller.js";

const route = Router();

route.get("/user_roles",getRoles);
route.post("/user_roles",postRoles);
route.delete("/user_roles/:id",deleteRoles);
route.put("/user_roles/:id",putRoles);

export default route;
