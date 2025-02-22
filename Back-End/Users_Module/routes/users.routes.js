import { Router } from "express";
import { deleteUser, getUsers, postUser, putUser ,getUserByID,getUserByFirebaseID,getBooksPurchasedByUser} from "../controller/users.controller.js";

const route = Router()

route.get("/",getUsers)
route.post("",postUser)
route.put("/:id",putUser)
route.delete("/:id",deleteUser)

route.get("/users_ID/:id",getUserByID);
route.get("/users_FB/:id",getUserByFirebaseID);

route.get("/:id_user/books", getBooksPurchasedByUser);

export default route;