"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessibleRoutes = exports.getResourceNameFromUrl = exports.ensureCamelCase = exports.applyPaginationOptions = exports.getPaginationOptions = exports.executeMiddlewares = exports.isPrimitive = exports.formatResourceId = exports.getRouteType = void 0;
const path_to_regexp_1 = require("path-to-regexp");
const types_1 = require("./types");
const getRouteType = ({ method, url, resourceName, }) => {
    // Exclude the query params from the path
    const realPath = url.split('?')[0];
    if (!realPath.includes(`/${resourceName}`)) {
        throw new Error(`invalid resource name '${resourceName}' for route '${realPath}'`);
    }
    const entityMatcher = path_to_regexp_1.match([`/(.*)/${resourceName}`, `/(.*)/${resourceName}/:id`], { decode: decodeURIComponent });
    const simpleMatcher = path_to_regexp_1.match(`/(.*)/${resourceName}`, {
        decode: decodeURIComponent,
    });
    switch (method) {
        case 'GET': {
            const pathMatch = entityMatcher(realPath);
            // If we got a /something after the resource name, we are reading 1 entity
            if (pathMatch && pathMatch.params.id) {
                return {
                    routeType: types_1.RouteType.READ_ONE,
                    resourceId: pathMatch.params.id,
                };
            }
            return {
                routeType: types_1.RouteType.READ_ALL,
            };
        }
        case 'POST': {
            const pathMatch = simpleMatcher(realPath);
            if (pathMatch) {
                return {
                    routeType: types_1.RouteType.CREATE,
                };
            }
            return {
                routeType: null,
            };
        }
        case 'PUT':
        case 'PATCH': {
            const pathMatch = entityMatcher(realPath);
            if (pathMatch && pathMatch.params.id) {
                return {
                    routeType: types_1.RouteType.UPDATE,
                    resourceId: pathMatch.params.id,
                };
            }
            return {
                routeType: null,
            };
        }
        case 'DELETE': {
            const pathMatch = entityMatcher(realPath);
            if (pathMatch && pathMatch.params.id) {
                return {
                    routeType: types_1.RouteType.DELETE,
                    resourceId: pathMatch.params.id,
                };
            }
            return {
                routeType: null,
            };
        }
        default: {
            return {
                routeType: null,
            };
        }
    }
};
exports.getRouteType = getRouteType;
const formatResourceId = (resourceId) => {
    return Number.isSafeInteger(+resourceId) ? +resourceId : resourceId;
};
exports.formatResourceId = formatResourceId;
const primitiveTypes = ['string', 'boolean', 'number'];
const isPrimitive = (value) => {
    return primitiveTypes.includes(typeof value);
};
exports.isPrimitive = isPrimitive;
const executeMiddlewares = (middlewares, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const validMiddlewares = middlewares.filter((fn) => typeof fn === 'function');
    let prevIndex = -1;
    const runner = (index) => __awaiter(void 0, void 0, void 0, function* () {
        /* istanbul ignore next */
        if (index === prevIndex) {
            throw new Error('too many next() invocations');
        }
        prevIndex = index;
        const fn = validMiddlewares[index];
        if (fn) {
            yield fn(ctx, () => {
                return runner(index + 1);
            });
        }
    });
    return runner(0);
});
exports.executeMiddlewares = executeMiddlewares;
const getPaginationOptions = (query, paginationConfig) => {
    if (typeof query.page !== 'undefined') {
        if (query.page <= 0) {
            throw new Error('page query must be a strictly positive number');
        }
        return {
            page: query.page,
            perPage: query.limit || paginationConfig.perPage,
        };
    }
    return null;
};
exports.getPaginationOptions = getPaginationOptions;
const applyPaginationOptions = (query, paginationOptions) => {
    query.skip = (paginationOptions.page - 1) * paginationOptions.perPage;
    query.limit = paginationOptions.perPage;
};
exports.applyPaginationOptions = applyPaginationOptions;
const ensureCamelCase = (str) => {
    return `${str.charAt(0).toLowerCase()}${str.slice(1)}`;
};
exports.ensureCamelCase = ensureCamelCase;
const getResourceNameFromUrl = (url, models) => {
    const splitUrl = url.split('?')[0];
    const modelName = Object.keys(models).find((modelName) => {
        const routeName = models[modelName];
        const camelCaseModel = exports.ensureCamelCase(routeName);
        return new RegExp(`(${routeName}|${camelCaseModel}$)|(${routeName}|${camelCaseModel}/)`, 'g').test(splitUrl);
    });
    return {
        modelName,
        resourceName: models[modelName],
    };
};
exports.getResourceNameFromUrl = getResourceNameFromUrl;
const getAccessibleRoutes = (only, exclude) => {
    let accessibleRoutes = [
        types_1.RouteType.READ_ALL,
        types_1.RouteType.READ_ONE,
        types_1.RouteType.UPDATE,
        types_1.RouteType.DELETE,
        types_1.RouteType.CREATE,
    ];
    if (only === null || only === void 0 ? void 0 : only.length) {
        accessibleRoutes = accessibleRoutes.filter((elem) => {
            return only === null || only === void 0 ? void 0 : only.includes(elem);
        });
    }
    if (exclude === null || exclude === void 0 ? void 0 : exclude.length) {
        accessibleRoutes = accessibleRoutes.filter((elem) => {
            return !(exclude === null || exclude === void 0 ? void 0 : exclude.includes(elem));
        });
    }
    return accessibleRoutes;
};
exports.getAccessibleRoutes = getAccessibleRoutes;
