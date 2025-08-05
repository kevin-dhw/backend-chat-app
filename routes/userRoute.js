import express from 'express'
import { checkAuth, login, signup, updateProfile, test } from '../controllers/userController.js';
import { protectRoute } from '../middleWare/auth.js';

const userRouter = express.Router();

userRouter.post("/signup", signup)
userRouter.post("/login", login)
userRouter.put('/update-profile', protectRoute, updateProfile)
userRouter.get("/check", protectRoute, checkAuth)
userRouter.get('/test', test)

export default userRouter