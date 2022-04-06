"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePrismaWhere = void 0;
const lodash_isobject_1 = __importDefault(require("lodash.isobject"));
const utils_1 = require("../../../utils");
const operatorsAssociation = {
    $eq: 'equals',
    $neq: 'not',
    $cont: 'contains',
    $ends: 'endsWith',
    $gt: 'gt',
    $gte: 'gte',
    $in: 'in',
    $lt: 'lt',
    $lte: 'lte',
    $notin: 'notIn',
    $starts: 'startsWith',
};
const isDateString = (value) => /^\d{4}-[01]\d-[0-3]\d(?:T[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[-+][0-2]\d(?::?[0-5]\d)?)?)?$/g.test(value);
const getSearchValue = (originalValue) => {
    if (isDateString(originalValue)) {
        return new Date(originalValue);
    }
    if (typeof originalValue === 'string' && originalValue === '$isnull') {
        return null;
    }
    return originalValue;
};
const isRelation = (key, manyRelations) => {
    // Get the key containing . and remove the property name
    const splitKey = key.split('.');
    splitKey.splice(-1, 1);
    return manyRelations.includes(splitKey.join('.'));
};
const parseSimpleField = (value) => {
    const operator = Object.keys(value)[0];
    const prismaOperator = operatorsAssociation[operator];
    if (prismaOperator) {
        return {
            [prismaOperator]: value[operator],
        };
    }
};
const parseObjectCombination = (obj, manyRelations) => {
    const parsed = {};
    Object.keys(obj).forEach((key) => {
        const val = obj[key];
        if (isRelation(key, manyRelations)) {
            parseRelation(val, key, parsed, manyRelations);
        }
        else if (utils_1.isPrimitive(val)) {
            parsed[key] = val;
        }
        else if (lodash_isobject_1.default(val)) {
            const fieldResult = parseSimpleField(val);
            if (fieldResult) {
                parsed[key] = fieldResult;
            }
        }
    });
    return parsed;
};
const basicParse = (value, key, parsed, manyRelations) => {
    if (utils_1.isPrimitive(value)) {
        parsed[key] = getSearchValue(value);
    }
    else {
        switch (key) {
            case '$or': {
                if (lodash_isobject_1.default(value)) {
                    parsed.OR = parseObjectCombination(value, manyRelations);
                }
                break;
            }
            case '$and': {
                if (lodash_isobject_1.default(value)) {
                    parsed.AND = parseObjectCombination(value, manyRelations);
                }
                break;
            }
            case '$not': {
                if (lodash_isobject_1.default(value)) {
                    parsed.NOT = parseObjectCombination(value, manyRelations);
                }
                break;
            }
            default: {
                parsed[key] = parseSimpleField(value);
                break;
            }
        }
    }
};
const parseRelation = (value, key, parsed, manyRelations) => {
    // Reverse the keys so that we can format our object by nesting
    const fields = key.split('.').reverse();
    let formatFields = {};
    fields.forEach((field, index) => {
        // If we iterate over the property name, which is index 0, we parse it like a normal field
        if (index === 0) {
            basicParse(value, field, formatFields, manyRelations);
        }
        // Else we format the relation filter in the prisma way
        else {
            formatFields = {
                [field]: {
                    some: formatFields,
                },
            };
        }
    });
    // Retrieve the main relation field
    const initialFieldKey = fields.reverse()[0];
    // Retrieve the old parsed version
    const oldParsed = parsed[initialFieldKey];
    // Format correctly in the prisma way
    parsed[initialFieldKey] = {
        some: Object.assign(Object.assign({}, ((oldParsed === null || oldParsed === void 0 ? void 0 : oldParsed.some) || {})), formatFields[initialFieldKey].some),
    };
};
const parsePrismaWhere = (where, manyRelations) => {
    const parsed = {};
    Object.keys(where).forEach((key) => {
        const value = where[key];
        /**
         * If the key without property name is a relation
         *
         * We want the following example input:
         *
         * posts.author.id: 1
         *
         * to output
         *
         * {
         *  posts: {
         *    some: {
         *      author: {
         *        some: {
         *          id: 1
         *        }
         *      }
         *    }
         *  }
         * }
         */
        if (isRelation(key, manyRelations)) {
            parseRelation(value, key, parsed, manyRelations);
        }
        else {
            basicParse(value, key, parsed, manyRelations);
        }
    });
    return parsed;
};
exports.parsePrismaWhere = parsePrismaWhere;
