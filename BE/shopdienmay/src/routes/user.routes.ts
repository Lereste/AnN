import { Router } from "express";
import UserController from "../controllers/user.controller";
import AuthController from "../controllers/auth.controller";

class UserRouter {
    public path = '/api/v1/users/';
    public router = Router();
    public userController = new UserController();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(this.path + 'signup', this.authController.signUp)
        this.router.post(this.path + 'login', this.authController.logIn)
        this.router.get(this.path + 'logout', this.authController.logOut)
        this.router.post    (this.path + 'forgotPassword', this.authController.forgotPassword)
        this.router.patch(this.path + 'resetPassword/:token', this.authController.resetPassword)

        //======= Protect all routes under =======
        this.router.use(this.authController.protect); 
        this.router.patch(this.path + 'updateMyPassword', this.authController.updatePassword);
    
        //======= sa
        this.router.use(this.authController.restrictTo('admin') as any);
        this.router.get(this.path, this.userController.getAllUsers)

    }
}

export default UserRouter;
