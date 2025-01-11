"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const validator_1 = tslib_1.__importDefault(require("validator"));
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'A User must have a Name'],
        maxlength: [40, 'A user name must have less or equal than 40 characters'],
        minlength: [5, 'A user name must have more or equal then 5 characters'],
        // match: [/^[a-zA-Z0-9_]+$/, 'User name can only contain letters, numbers and underscores']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'A User must have an Email'],
        unique: true,
        lowercase: true,
        // ============= Cách 1:
        // validate: [
        //     {
        //         validator: validator.isEmail,
        //         message: "Please provide a valid email"
        //     }
        // ]
        // ============= Cách 2:
        // validate: {
        //     validator: function (value) {
        //         return validator.isEmail(value);  // Kiểm tra email hợp lệ
        //     },
        //     message: 'Please provide a valid email'  // Thông báo lỗi nếu không hợp lệ
        // }
        // ============= Cách 3:
        validate: [validator_1.default.isEmail, 'Please provide a valid email'],
    },
    phone: {
        type: String,
    },
    photo: {
        type: String,
        default: 'default-user-photo.jpg',
    },
    role: {
        type: String,
        enum: ['admin', 'staff', 'user'],
        default: 'user',
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        minlength: 8,
        select: false,
        /*
            ================= Custom validate function: throw new Error cần dùng try-catch block để xử lý lỗi
            try {
                user.validate(password);
            } catch (err) {
                console.error(err.message); // Thông báo lỗi sẽ được xử lý thủ công
            }
        */
        validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error('Password must contain at least one letter and one number');
            }
        },
        /*
            ================= Mongoose built-in validator
            user.save() // Nếu validation không thành công, Mongoose sẽ tự động ném lỗi và không lưu tài liệu.
                .catch(err => {
                    console.error(err.message); // Thông báo lỗi sẽ được xử lý tự động.
                });
        */
        // validate: {
        //   validator: function (value: string): boolean {
        //     const hasNumber = value.match(/\d/) !== null; // Kiểm tra ít nhất một số
        //     const hasLetter = value.match(/[a-zA-Z]/) !== null; // Kiểm tra ít nhất một chữ cái
        //     // Trả về true nếu cả hai điều kiện đều thỏa mãn
        //     return hasNumber && hasLetter;
        //   },
        //   message: 'Password must contain at least one letter and one number', // Thông báo lỗi khi validate không thành công
        // },
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // Validation only work on CREATE or SAVE - await User.create(request.body);
            validator: function (value) {
                return value === this.password;
            },
            message: 'Password Confirm do not match with Password',
        },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
});
UserSchema.set('toJSON', {
    virtuals: true, // create: key id
    versionKey: false, // delete key: _v
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id; // delete key: _id
    },
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