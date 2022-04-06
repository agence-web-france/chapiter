"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQuery = void 0;
const qs = __importStar(require("qs"));
const lodash_set_1 = __importDefault(require("lodash.set"));
const parseRecursive = (select) => {
    if (typeof select === 'string') {
        const selectFields = {};
        const fields = select.split(',');
        fields.forEach((field) => {
            lodash_set_1.default(selectFields, field, true);
        });
        return selectFields;
    }
    throw new Error('select query param must be a string');
};
const parseWhere = (where) => {
    const whereObj = JSON.parse(where);
    const parsed = {};
    Object.keys(whereObj).forEach((key) => {
        lodash_set_1.default(parsed, key, whereObj[key]);
    });
    return parsed;
};
const parseOrderBy = (orderBy) => {
    const parsed = {};
    const orderByObj = JSON.parse(orderBy);
    if (Object.keys(orderByObj).length >= 1) {
        const key = Object.keys(orderByObj)[0];
        if (orderByObj[key] === '$asc' || orderByObj[key] === '$desc') {
            parsed[key] = orderByObj[key];
        }
    }
    if (Object.keys(parsed).length !== 1) {
        throw new Error('orderBy needs to be an object with exactly 1 property with either $asc or $desc value');
    }
    return parsed;
};
const parseQuery = (queryString) => {
    if (queryString) {
        const query = qs.parse(queryString);
        const parsedQuery = {};
        if (query.select) {
            parsedQuery.select = parseRecursive(query.select);
        }
        if (query.include) {
            parsedQuery.include = parseRecursive(query.include);
        }
        if (query.where) {
            parsedQuery.where = parseWhere(query.where);
        }
        if (query.orderBy) {
            parsedQuery.orderBy = parseOrderBy(query.orderBy);
        }
        if (typeof query.limit !== 'undefined') {
            parsedQuery.limit = Number.isFinite(+query.limit)
                ? +query.limit
                : undefined;
        }
        if (typeof query.skip !== 'undefined') {
            parsedQuery.skip = Number.isFinite(+query.skip) ? +query.skip : undefined;
        }
        if (query.distinct) {
            parsedQuery.distinct = query.distinct;
        }
        if (query.page) {
            parsedQuery.page = Number.isFinite(+query.page) ? +query.page : undefined;
        }
        return Object.assign({ originalQuery: query }, parsedQuery);
    }
    return {};
};
exports.parseQuery = parseQuery;
