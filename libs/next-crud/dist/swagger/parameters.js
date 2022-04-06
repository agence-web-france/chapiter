"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryParams = exports.listQueryParams = exports.commonQueryParams = void 0;
const types_1 = require("../types");
const queryParams = {
    select: {
        name: 'select',
        description: 'Fields to select. For nested fields, chain them separated with a dot, eg: user.posts',
        schema: {
            type: 'string',
        },
    },
    include: {
        name: 'include',
        description: 'Include relations, same as select',
        schema: {
            type: 'string',
        },
    },
    where: {
        name: 'where',
        description: 'Fields to filter. See <a href="https://next-crud.js.org/query-params#where">the docs</a>',
        schema: {
            type: 'string',
        },
    },
    orderBy: {
        name: 'orderBy',
        description: 'Field on which to order by a direction. See <a href="https://next-crud.js.org/query-params#orderBy">the docs</a>',
        schema: {
            type: 'string',
        },
    },
    limit: {
        name: 'limit',
        description: 'Maximum number of elements to retrieve',
        schema: {
            type: 'integer',
            minimum: 0,
        },
    },
    skip: {
        name: 'skip',
        description: 'Number of rows to skip',
        schema: {
            type: 'integer',
            minimum: 0,
        },
    },
    distinct: {
        name: 'distinct',
        description: 'Fields to distinctively retrieve',
        schema: {
            type: 'string',
        },
    },
    page: {
        name: 'page',
        description: 'Page number. Use only for pagination.',
        schema: {
            type: 'integer',
            minimum: 1,
        },
    },
};
exports.commonQueryParams = [queryParams.select, queryParams.include];
exports.listQueryParams = [
    ...exports.commonQueryParams,
    queryParams.limit,
    queryParams.skip,
    queryParams.where,
    queryParams.orderBy,
    queryParams.page,
    queryParams.distinct,
];
const getQueryParams = (routeType, additionalQueryParams = []) => {
    switch (routeType) {
        case types_1.RouteType.READ_ALL:
            return [...exports.listQueryParams, ...additionalQueryParams];
        default:
            return [...exports.commonQueryParams, ...additionalQueryParams];
    }
};
exports.getQueryParams = getQueryParams;
