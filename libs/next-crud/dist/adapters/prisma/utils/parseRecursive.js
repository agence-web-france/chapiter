"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePrismaRecursiveField = void 0;
const parsePrismaRecursiveField = (select, fieldName) => {
    const parsed = {};
    Object.keys(select).forEach((field) => {
        if (select[field] !== true) {
            parsed[field] = {
                [fieldName]: exports.parsePrismaRecursiveField(select[field], fieldName),
            };
        }
        else {
            parsed[field] = true;
        }
    });
    return parsed;
};
exports.parsePrismaRecursiveField = parsePrismaRecursiveField;
