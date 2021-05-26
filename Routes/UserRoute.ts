import { login, register } from './../Handlers/UserHandler';
import express from "express"

export const UserRouter = express.Router();

UserRouter.post("/login", login)
UserRouter.post("/register", register)

