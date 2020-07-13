import { Request, Response } from 'express';

export class UserController {

    static async createUser(req: Request, res: Response) {
        res.json({message: 'user created'})
    }

    static async login(req: Request, res: Response) {
        res.json({message: 'user logged in'})
    }

}
