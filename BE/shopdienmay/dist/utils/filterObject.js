"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterObject = void 0;
const filterObject = (obj, ...allowedFields) => {
    const newObject = {};
    Object.keys(obj).forEach(element => {
        if (allowedFields.includes(element)) {
            newObject[element] = obj[element];
        }
    });
    return newObject;
};
exports.filterObject = filterObject;
//# sourceMappingURL=filterObject.js.map