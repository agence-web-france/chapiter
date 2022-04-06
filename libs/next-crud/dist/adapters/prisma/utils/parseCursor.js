"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePrismaCursor = void 0;
const utils_1 = require("../../../utils");
const parsePrismaCursor = (cursor) => {
    const parsed = {};
    Object.keys(cursor).forEach((key) => {
        const value = cursor[key];
        if (utils_1.isPrimitive(value)) {
            parsed[key] = value;
        }
    });
    if (Object.keys(parsed).length !== 1) {
        throw new Error('cursor needs to be an object with exactly 1 property with a primitive value');
    }
    return parsed;
};
exports.parsePrismaCursor = parsePrismaCursor;
