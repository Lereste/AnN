"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_model_1 = tslib_1.__importDefault(require("../models/user.model"));
const factory_service_1 = tslib_1.__importDefault(require("../services/factory.service"));
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = tslib_1.__importDefault(require("../utils/appError"));
const filterObject_1 = require("../utils/filterObject");
class UserController {
    constructor() {
        this.factoryService = new factory_service_1.default();
        this.createMessage = 'Created User Successfully!';
        // Use to update User Infomation with field: name, email, photo
        this.updateAccount = (0, catchAsync_1.catchAsync)((request, response, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // 1) Create error if user use POSTs password method
            if (request.body.password || request.body.passwordConfirm) {
                return next(new appError_1.default('This route is not for Password Updates. Use /updateMyPassword instead', 400));
            }
            // 2) Filter fields that are allowed to be updated
            // const photoFileName = request.file ? request.file.filename : 'default.jpg';
            // const requestBody = { photo: photoFileName, ...request.body };
            // const filteredBody = filterObject(requestBody, 'name', 'email', 'photo');
            const filteredBody = (0, filterObject_1.filterObject)(request.body, 'name', 'email');
            // if (request.file) filteredBody.photo = request.file.filename;
            if (request.files) {
                filteredBody.photo = request.files.photo[0].originalname;
            }
            // 3) Update user document
            const updatedUser = yield user_model_1.default.findByIdAndUpdate(request.user.id, filteredBody, {
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
        }));
        this.getAllUsers = this.factoryService.getAll(user_model_1.default);
        this.getUserById = this.factoryService.getOne(user_model_1.default);
        this.updateUserById = this.factoryService.updateOne(user_model_1.default); // do NOT update password with this
        this.deleteUserById = this.factoryService.deleteOne(user_model_1.default);
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map