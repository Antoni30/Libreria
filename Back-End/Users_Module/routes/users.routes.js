import { Router } from "express";
import { deleteUser, getUsers, postUser, putUser } from "../controller/users.controller.js";

const route = Router()

route.get("/users",getUsers)
route.post("/users",postUser)
route.put("/users/:id",putUser)
route.delete("/users/:id",deleteUser)


export default route;