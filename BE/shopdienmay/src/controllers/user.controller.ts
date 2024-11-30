import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';
import FactoryService from '../services/factory.service';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/appError';
import { filterObject } from '../utils/filterObject';
import { IFilterUser } from '../interfaces/filterUserObject.interface';

import multer from 'multer';
import sharp from 'sharp';
import { AuthRequest } from '../interfaces/request.interface';

class UserController {
  private factoryService = new FactoryService();
  private createMessage: string = 'Created User Successfully!';

  // Use to update User Infomation with field: name, email, photo
  public updateAccount = catchAsync(async (request: AuthRequest, response: Response, next: NextFunction) => {
    // 1) Create error if user use POSTs password method
    if (request.body.password || request.body.passwordConfirm) {
      return next(new AppError('This route is not for Password Updates. Use /updateMyPassword instead', 400));
    }

    // 2) Filter fields that are allowed to be updated
    // const photoFileName = request.file ? request.file.filename : 'default.jpg';
    // const requestBody = { photo: photoFileName, ...request.body };
    // const filteredBody = filterObject(requestBody, 'name', 'email', 'photo');

    const filteredBody = filterObject(request.body, 'name', 'email');

    // if (request.file) filteredBody.photo = request.file.filename;
    if (request.files) {
      (filteredBody as IFilterUser).photo = request.files.photo[0].originalname;
    }

    // 3) Update user document
    const updatedUser = await UserModel.findByIdAndUpdate(request.user.id, filteredBody, {
      new: true,
      runValidators: true,
    });

    response.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: {
        user: updatedUser,
      },
    });
  });

  public getAllUsers = this.factoryService.getAll(UserModel);
  public getUserById = this.factoryService.getOne(UserModel);
  public updateUserById = this.factoryService.updateOne(UserModel); // do NOT update password with this
  public deleteUserById = this.factoryService.deleteOne(UserModel);
}

export default UserController;
