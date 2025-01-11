"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeVietnameseDiacritics = void 0;
const removeVietnameseDiacritics = (str) => {
    // Sắc > huyền > hỏi > ngã > nặng
    const map = {
        á: 'a',
        à: 'a',
        ả: 'a',
        ã: 'a',
        ạ: 'a',
        //
        â: 'a',
        ấ: 'a',
        ầ: 'a',
        ẩ: 'a',
        ẫ: 'a',
        ậ: 'a',
        //
        ă: 'a',
        ắ: 'a',
        ằ: 'a',
        ẳ: 'a',
        ẵ: 'a',
        ặ: 'a',
        //
        đ: 'd',
        //
        é: 'e',
        è: 'e',
        ẻ: 'e',
        ẽ: 'e',
        ẹ: 'e',
        //
        ê: 'e',
        ế: 'e',
        ề: 'e',
        ể: 'e',
        ễ: 'e',
        ệ: 'e',
        //
        í: 'i',
        ì: 'i',
        ỉ: 'i',
        ĩ: 'i',
        ị: 'i',
        //
        ó: 'o',
        ò: 'o',
        ỏ: 'o',
        õ: 'o',
        ọ: 'o',
        //
        ô: 'o',
        ố: 'o',
        ồ: 'o',
        ổ: 'o',
        ỗ: 'o',
        ộ: 'o',
        //
        ơ: 'o',
        ớ: 'o',
        ờ: 'o',
        ở: 'o',
        ỡ: 'o',
        ợ: 'o',
        //
        ú: 'u',
        ù: 'u',
        ủ: 'u',
        ũ: 'u',
        ụ: 'u',
        //
        ư: 'u',
        ứ: 'u',
        ừ: 'u',
        ử: 'u',
        ữ: 'u',
        ự: 'u',
        //
        ý: 'y',
        ỳ: 'y',
        ỷ: 'y',
        ỹ: 'y',
        ỵ: 'y',
    };
    // Normalize and remove combining diacritical marks
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[áàảãạâấầẩẫậăắằẳẵặđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ]/g, (match) => map[match] || match);
};
exports.removeVietnameseDiacritics = removeVietnameseDiacritics;
//# sourceMappingURL=removeDiacritics.js.map