import { Request, Response, NextFunction } from 'express';
import UserModel from "../models/user.model";
import FactoryService from '../services/factory.service';

class UserController {
    private factoryService = new FactoryService();
    private createMessage: string = "Created User Successfully!"

    // public createUser = async (req: Request, res: Response, next: NextFunction) => {


    // }
    // public createNewUser = this.factoryService.createOne(UserModel, this.createMessage);


}

export default UserController;