import { Router } from "express";
import { getUsers } from "../controller/users.controller.js";

const route = Router()

route.get("/users",getUsers)


export default route;