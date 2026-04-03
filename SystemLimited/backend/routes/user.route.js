import express from 'express'
import * as auth from '../controllers/user.controllers.js'
import User from '../models/userModel.js'
import { requireSignIn } from "../middlewares/authMiddleware.js";

const UserRoute = express.Router()

// before login routes public

UserRoute.post("/pre-signup",auth.PreSingup)
UserRoute.post("/signup",auth.Singup)
UserRoute.get("/activate/:token", auth.ActivateAccount);
UserRoute.post("/login",auth.Login)
UserRoute.post("/otp",auth.forgetPassword_otp)
UserRoute.post("/reset-password",auth.resetPassword)
UserRoute.post("/change-password",auth.changePassword)


//after login  protected routes

UserRoute.get("/fetch_logged-user",auth.fetchLoggedUser)

// after login protected routes
UserRoute.get("/allusers", auth.getAllUsers);
UserRoute.get("/:id", auth.getSingleUser);


UserRoute.put("/:id", requireSignIn, auth.updateUser);
UserRoute.delete("/:id", requireSignIn, auth.deleteUser);

export default UserRoute
