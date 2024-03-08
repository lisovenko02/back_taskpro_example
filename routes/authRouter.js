import express from "express";
// import { registerUser, loginUser, getCurrentUser, logoutUser, updateTheme, updateUserProfile } from "../controllers/authControllers.js";
// import { checkRegisterData, checkLoginData, protect, checkThemeData, uploadAvatar, checkProfileData } from "../middlewares/authMiddleware.js";
import { registerUser, loginUser, getCurrentUser, logoutUser, updateTheme, updateUser} from "../controllers/authControllers.js";
import { authorization } from "../middlewares/authMiddleware.js";
import { validateBody } from "../middlewares/validateBody.js";
import { loginUserSchema, registerUserSchema, themeSchema, updateSchema } from "../schemas/usersSchemas.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser, validateBody(registerUserSchema));
authRouter.post("/login", loginUser, validateBody(loginUserSchema));
authRouter.get("/current", authorization, getCurrentUser);
authRouter.post("/logout", authorization, logoutUser);
authRouter.patch("/themes", authorization, validateBody(themeSchema), updateTheme);
authRouter.patch("/update", authorization , upload.single("avatar"),validateBody(updateSchema), updateUser)

export default authRouter;
