"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateImageUrls = void 0;
const updateImageUrls = (item, baseImageUrl) => {
    if (item.image) {
        item.image = `${baseImageUrl}${item.image}`;
    }
    if (item.imageList) {
        if (typeof item.imageList === 'string') {
            // Split the string by commas to create an array
            item.imageList = item.imageList.split(',').map((imageUrl) => {
                return `${baseImageUrl}${imageUrl.trim()}`; // Prepend base URL and remove extra spaces
            });
        }
        else if (Array.isArray(item.imageList)) {
            // If imageList is already an array, just prepend the base URL to each image
            item.imageList = item.imageList.map((imageUrl) => {
                return `${baseImageUrl}${imageUrl.trim()}`;
            });
        }
    }
};
exports.updateImageUrls = updateImageUrls;
//# sourceMappingURL=updateImageUrls.js.map