
const filterObject = (obj: Object, ...allowedFields: string[]) => {
    const newObject = {};
    Object.keys(obj).forEach(element => {
        if (allowedFields.includes(element)) {
            newObject[element] = obj[element];
        }
    });

    return newObject;
}

//EXPORT
export {
    filterObject,
};
