import { Router } from "express";
import users from "../controllers/users";
// Import form Message Controller
const userRouter = Router();

userRouter.route("/users").get(users.GET);
// .delete();

export default userRouter;
