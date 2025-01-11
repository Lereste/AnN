import { Router } from 'express';
import UserController from '../controllers/user.controller';
import AuthController from '../controllers/auth.controller';
import { uploadImages } from '../middlewares/upload-images.middleware';
import resizeImageList from '../middlewares/resize-images.middleware';

class UserRouter {
  public path = '/users/';
  public router = Router();
  public userController = new UserController();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(this.path + 'signup', this.authController.signUp);
    this.router.post(this.path + 'login', this.authController.logIn);
    this.router.get(this.path + 'logout', this.authController.logOut);
    this.router.post(this.path + 'forgotPassword', this.authController.forgotPassword);
    this.router.patch(this.path + 'resetPassword/:token', this.authController.resetPassword);

    this.router.use(this.path, this.authController.protect); //======= Protect all routes under =======
    this.router.patch(this.path + 'updateMyPassword', this.authController.updatePassword);
    this.router.patch(this.path + 'updateMe', uploadImages, resizeImageList, this.userController.updateAccount);

    this.router.get(this.path, this.authController.restrictTo('admin'), this.userController.getAllUsers);
  }
}

export default UserRouter;
