"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const validator_1 = tslib_1.__importDefault(require("validator"));
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "A User must have a name"],
        maxlength: [40, 'A user name must have less or equal than 40 characters'],
        minlength: [10, 'A user name must have more or equal then 10 characters'],
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator_1.default.isEmail, "Please provide a valid email"]
    },
    photo: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'guest'],
        default: 'guest'
    },
    password: {
        type: String,
        required: [true, "A user must have a password"],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            // Validation only work on CREATE or SAVE - await User.create(request.body);
            validator: function (value) {
                return value === this.password;
            },
            message: "Password Confirm do not match with Password"
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});
UserSchema.set('toJSON', {
    virtuals: true, // create: key id
    versionKey: false, // delete key: _v
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id; // delete key: _id
    }
});
UserSchema.pre('save', function (next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // Chỉ chạy encrypt khi nào password của user modify (vd: email thay đổi thì kh cần chạy)
        if (!this.isModified('password'))
            return next();
        // hash ở đây là async func, không muốn nó là sync bởi vì nếu nó chạy lâu thì sẽ block the event loop and prevent other users
        this.password = yield bcryptjs_1.default.hash(this.password, 12);
        // Ở đây chúng ta phải set passwordConfirm là undefind (xoá nó trong client và moongose) bởi vì password đã đc hash trước khi save
        // Nhập password và passwordConfirm phải giống nhau > hash password > nên không cần thằng confirmPassword nữa > save 
        // passwordConfirm có validate là required (required của input chứ không phải cần required thêm ở database)
        this.passwordConfirm = undefined;
        next();
    });
});
// Documment middleware: only runs before .save() and .create() - not for UPDATE
UserSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew)
        return next();
    this.passwordChangedAt = Date.now() - 1000; // trừ đi 1s vì lúc đó token mới khi user update password đã được chạy xong
    next();
});
// UserSchema.methods.comparePassword = async function (candidatePassword: string, userPassword: string) {
//     return await bcrypt.compare(candidatePassword, userPassword)
// }
const UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map