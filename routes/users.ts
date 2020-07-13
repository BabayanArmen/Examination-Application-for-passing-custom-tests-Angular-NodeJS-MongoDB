import * as express from 'express'
import { UserController } from '../controllers/users'

const usersRouter = express.Router();

//localhost:3000/user/signup
usersRouter.post('/signup', UserController.createUser)

//localhost:3000/user/login
usersRouter.get('/login', UserController.login)

export {usersRouter}