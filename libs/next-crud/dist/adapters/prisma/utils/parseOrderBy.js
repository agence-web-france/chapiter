"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePrismaOrderBy = void 0;
const operatorsAssociation = {
    $asc: 'asc',
    $desc: 'desc',
};
const parsePrismaOrderBy = (orderBy) => {
    const parsed = {};
    Object.keys(orderBy).forEach((key) => {
        const value = orderBy[key];
        parsed[key] = operatorsAssociation[value];
    });
    return parsed;
};
exports.parsePrismaOrderBy = parsePrismaOrderBy;
