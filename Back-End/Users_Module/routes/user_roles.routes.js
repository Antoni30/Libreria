import { Router } from "express";
import { getRoles, postRoles, putRoles,deleteRoles} from "../controller/user_roles.controller.js";

const route = Router();
route.get("/",getRoles);
route.post("/",postRoles);
route.delete("/:id",deleteRoles);
route.put("/:id",putRoles);



export default route;
