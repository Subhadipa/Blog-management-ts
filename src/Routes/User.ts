import { Router } from "express";
import userController from "../Controller/User/User";

const UserRouter: Router = Router();

UserRouter.get("/profile", userController.getUserDetails);

export default UserRouter;
