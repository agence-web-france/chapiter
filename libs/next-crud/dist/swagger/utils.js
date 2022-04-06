"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSwaggerPaths = exports.getSwaggerTags = exports.getModelsAccessibleRoutes = exports.formatSchemaRef = exports.generateMethodForRouteType = exports.generatePathByRouteType = void 0;
const types_1 = require("../types");
const utils_1 = require("../utils");
const parameters_1 = require("./parameters");
const generatePathByRouteType = (resourceName, routeType) => {
    switch (routeType) {
        case types_1.RouteType.CREATE:
        case types_1.RouteType.READ_ALL:
            return `/${resourceName}`;
        case types_1.RouteType.READ_ONE:
        case types_1.RouteType.UPDATE:
        case types_1.RouteType.DELETE:
            return `/${resourceName}/id`;
    }
};
exports.generatePathByRouteType = generatePathByRouteType;
const generateMethodForRouteType = (routeType) => {
    switch (routeType) {
        case types_1.RouteType.CREATE:
            return 'post';
        case types_1.RouteType.READ_ALL:
        case types_1.RouteType.READ_ONE:
            return 'get';
        case types_1.RouteType.UPDATE:
            return 'put';
        case types_1.RouteType.DELETE:
            return 'delete';
    }
};
exports.generateMethodForRouteType = generateMethodForRouteType;
const generateContentForSchema = (schemaName, isArray) => {
    if (isArray) {
        return {
            type: 'array',
            items: {
                $ref: exports.formatSchemaRef(schemaName),
            },
        };
    }
    return {
        $ref: exports.formatSchemaRef(schemaName),
    };
};
const generateSwaggerResponse = (routeType, modelName) => {
    switch (routeType) {
        case types_1.RouteType.CREATE:
            return {
                statusCode: 201,
                content: {
                    description: `${modelName} created`,
                    content: {
                        'application/json': {
                            schema: generateContentForSchema(modelName),
                        },
                    },
                },
            };
        case types_1.RouteType.DELETE:
            return {
                statusCode: 200,
                content: {
                    description: `${modelName} item deleted`,
                    content: {
                        'application/json': {
                            schema: generateContentForSchema(modelName),
                        },
                    },
                },
            };
        case types_1.RouteType.READ_ALL:
            return {
                statusCode: 200,
                content: {
                    description: `${modelName} list retrieved`,
                    content: {
                        'application/json': {
                            schema: {
                                oneOf: [
                                    generateContentForSchema(modelName, true),
                                    generateContentForSchema(`${modelName}Page`, false),
                                ],
                            },
                        },
                    },
                },
            };
        case types_1.RouteType.READ_ONE:
            return {
                statusCode: 200,
                content: {
                    description: `${modelName} item retrieved`,
                    content: {
                        'application/json': {
                            schema: generateContentForSchema(modelName),
                        },
                    },
                },
            };
        case types_1.RouteType.UPDATE:
            return {
                statusCode: 200,
                content: {
                    description: `${modelName} item updated`,
                    content: {
                        'application/json': {
                            schema: generateContentForSchema(modelName),
                        },
                    },
                },
            };
    }
};
const generateRequestBody = (schemaStartName, modelName) => {
    return {
        content: {
            'application/json': {
                schema: {
                    $ref: exports.formatSchemaRef(`${schemaStartName}${modelName}`),
                },
            },
        },
    };
};
const formatSchemaRef = (schemaName) => {
    return `#/components/schemas/${schemaName}`;
};
exports.formatSchemaRef = formatSchemaRef;
const getModelsAccessibleRoutes = (modelNames, models) => {
    return modelNames.reduce((acc, modelName) => {
        if (models === null || models === void 0 ? void 0 : models[modelName]) {
            return Object.assign(Object.assign({}, acc), { [modelName]: utils_1.getAccessibleRoutes(models[modelName].only, models[modelName].exclude) });
        }
        return Object.assign(Object.assign({}, acc), { [modelName]: utils_1.getAccessibleRoutes() });
    }, {});
};
exports.getModelsAccessibleRoutes = getModelsAccessibleRoutes;
const getSwaggerTags = (modelNames, modelsConfig) => {
    return modelNames.map((modelName) => {
        var _a;
        if ((_a = modelsConfig === null || modelsConfig === void 0 ? void 0 : modelsConfig[modelName]) === null || _a === void 0 ? void 0 : _a.tag) {
            return modelsConfig[modelName].tag;
        }
        return {
            name: modelName,
        };
    });
};
exports.getSwaggerTags = getSwaggerTags;
const formatSimpleRoute = (resourceName) => `/${resourceName}`;
const formatResourceAccessorRoute = (resourceName) => `/${resourceName}/{id}`;
const generateSwaggerPathObject = ({ tag, routeTypes, modelName, modelsConfig, hasId, }) => {
    const methods = {};
    routeTypes.forEach((routeType) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        if (routeTypes.includes(routeType)) {
            const returnType = (_h = (_e = (_d = (_c = (_b = (_a = modelsConfig === null || modelsConfig === void 0 ? void 0 : modelsConfig[modelName]) === null || _a === void 0 ? void 0 : _a.routeTypes) === null || _b === void 0 ? void 0 : _b[routeType]) === null || _c === void 0 ? void 0 : _c.response) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : (_g = (_f = modelsConfig === null || modelsConfig === void 0 ? void 0 : modelsConfig[modelName]) === null || _f === void 0 ? void 0 : _f.type) === null || _g === void 0 ? void 0 : _g.name) !== null && _h !== void 0 ? _h : modelName;
            const response = generateSwaggerResponse(routeType, returnType);
            const method = exports.generateMethodForRouteType(routeType);
            methods[method] = {
                tags: [tag],
                summary: (_l = (_k = (_j = modelsConfig === null || modelsConfig === void 0 ? void 0 : modelsConfig[modelName]) === null || _j === void 0 ? void 0 : _j.routeTypes) === null || _k === void 0 ? void 0 : _k[routeType]) === null || _l === void 0 ? void 0 : _l.summary,
                parameters: parameters_1.getQueryParams(routeType).map((queryParam) => {
                    return Object.assign(Object.assign({}, queryParam), { in: 'query' });
                }),
                responses: Object.assign({ [response.statusCode]: response.content }, (((_p = (_o = (_m = modelsConfig === null || modelsConfig === void 0 ? void 0 : modelsConfig[modelName]) === null || _m === void 0 ? void 0 : _m.routeTypes) === null || _o === void 0 ? void 0 : _o[routeType]) === null || _p === void 0 ? void 0 : _p.responses) ||
                    {})),
            };
            if (hasId) {
                methods[method].parameters.push({
                    in: 'path',
                    name: 'id',
                    description: `ID of the ${modelName}`,
                    required: true,
                    schema: {
                        type: 'string',
                    },
                });
            }
            if (routeType === types_1.RouteType.UPDATE || routeType === types_1.RouteType.CREATE) {
                switch (routeType) {
                    case types_1.RouteType.UPDATE:
                        methods[method].requestBody = generateRequestBody('Update', returnType);
                        break;
                    case types_1.RouteType.CREATE:
                        methods[method].requestBody = generateRequestBody('Create', returnType);
                        break;
                }
            }
        }
    });
    return methods;
};
const getSwaggerPaths = ({ routes, models, modelsConfig, routesMap, }) => {
    return Object.keys(routes).reduce((acc, val) => {
        var _a, _b, _c;
        const routeTypes = routes[val];
        const resourceName = ((_a = models === null || models === void 0 ? void 0 : models[val]) === null || _a === void 0 ? void 0 : _a.name) ? models[val].name
            : (routesMap === null || routesMap === void 0 ? void 0 : routesMap[val]) || val;
        const tag = ((_c = (_b = modelsConfig === null || modelsConfig === void 0 ? void 0 : modelsConfig[val]) === null || _b === void 0 ? void 0 : _b.tag) === null || _c === void 0 ? void 0 : _c.name) || val;
        if (routeTypes.includes(types_1.RouteType.CREATE) ||
            routeTypes.includes(types_1.RouteType.READ_ALL)) {
            const path = formatSimpleRoute(resourceName);
            const routeTypesToUse = [types_1.RouteType.READ_ALL, types_1.RouteType.CREATE].filter((routeType) => routeTypes.includes(routeType));
            acc[path] = generateSwaggerPathObject({
                tag,
                modelName: val,
                modelsConfig,
                routeTypes: routeTypesToUse,
            });
        }
        if (routeTypes.includes(types_1.RouteType.READ_ONE) ||
            routeTypes.includes(types_1.RouteType.UPDATE) ||
            routeTypes.includes(types_1.RouteType.DELETE)) {
            const path = formatResourceAccessorRoute(resourceName);
            const routeTypesToUse = [
                types_1.RouteType.READ_ONE,
                types_1.RouteType.UPDATE,
                types_1.RouteType.DELETE,
            ].filter((routeType) => routeTypes.includes(routeType));
            acc[path] = generateSwaggerPathObject({
                tag,
                modelName: val,
                modelsConfig,
                routeTypes: routeTypesToUse,
                hasId: true,
            });
        }
        return acc;
    }, {});
};
exports.getSwaggerPaths = getSwaggerPaths;
