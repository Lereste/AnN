"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_model_1 = tslib_1.__importDefault(require("../models/user.model"));
const factory_service_1 = tslib_1.__importDefault(require("../services/factory.service"));
class UserController {
    constructor() {
        this.factoryService = new factory_service_1.default();
        this.createMessage = "Created User Successfully!";
        // public createUser = async (req: Request, res: Response, next: NextFunction) => {
        // }
        // public createNewUser = this.factoryService.createOne(UserModel, this.createMessage);
        this.getAllUsers = this.factoryService.getAll(user_model_1.default);
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map