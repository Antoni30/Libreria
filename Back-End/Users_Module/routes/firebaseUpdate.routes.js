import { Router } from "express";
import {deleteEmail,updatePassword} from '../controller/firbase.controller.js'

const routes = Router()
routes.delete("/delete-user/:uid",deleteEmail);
  
routes.put("/update-password/:uid",updatePassword);

export default routes;