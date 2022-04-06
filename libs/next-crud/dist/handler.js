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
const handlers_1 = require("./handlers");
const queryParser_1 = require("./queryParser");
const types_1 = require("./types");
const utils_1 = require("./utils");
const utils_2 = require("./swagger/utils");
// const api_utils_1 = require("next/dist/next-server/server/api-utils");
const defaultPaginationConfig = {
    perPage: 20,
};
const defaultSwaggerConfig = {
    enabled: process.env.NODE_ENV === 'development',
    path: '/api/docs',
    title: 'CRUD API',
    apiUrl: '',
};
function NextCrud({ adapter, models, formatResourceId = utils_1.formatResourceId, onRequest, onSuccess, onError, middlewares = [], pagination = defaultPaginationConfig, swagger = defaultSwaggerConfig, }) {
    var _a, _b;
    if (!adapter.create ||
        !adapter.delete ||
        !adapter.getAll ||
        !adapter.getOne ||
        !adapter.parseQuery ||
        !adapter.update ||
        !adapter.getPaginationData ||
        !adapter.getModels) {
        throw new Error('missing method in adapter');
    }
    const routeNames = (_a = adapter.mapModelsToRouteNames) === null || _a === void 0 ? void 0 : _a.call(adapter);
    const modelRoutes = {};
    for (const modelName of adapter.getModels()) {
        modelRoutes[modelName] =
            ((_b = models === null || models === void 0 ? void 0 : models[modelName]) === null || _b === void 0 ? void 0 : _b.name) || (routeNames === null || routeNames === void 0 ? void 0 : routeNames[modelName]) || modelName;
    }
    let swaggerJson;
    const swaggerConfig = Object.assign(Object.assign({}, defaultSwaggerConfig), swagger);
    if (swaggerConfig === null || swaggerConfig === void 0 ? void 0 : swaggerConfig.enabled) {
        const swaggerRoutes = utils_2.getModelsAccessibleRoutes(adapter.getModels(), models);
        const swaggerTags = utils_2.getSwaggerTags(adapter.getModels(), swaggerConfig.config);
        const swaggerPaths = utils_2.getSwaggerPaths({
            routes: swaggerRoutes,
            modelsConfig: swaggerConfig === null || swaggerConfig === void 0 ? void 0 : swaggerConfig.config,
            models,
            routesMap: routeNames,
        });
        swaggerJson = {
            openapi: '3.0.1',
            info: {
                title: swaggerConfig.title,
                version: '1.0',
            },
            servers: [{ url: swaggerConfig.apiUrl }],
            tags: swaggerTags,
            paths: swaggerPaths,
        };
        if (adapter.getModelsJsonSchema) {
            swaggerJson.components = {
                schemas: adapter.getModelsJsonSchema(),
            };
        }
    }
    const handler = (req, res) => __awaiter(this, void 0, void 0, function* () {
        var _c, _d, _e, _f;
        const { url, method, body } = req;
        if (url.includes(swaggerConfig.path) && swaggerConfig.enabled) {
            res.status(200).json(swaggerJson);
            return;
        }
        const { resourceName, modelName } = utils_1.getResourceNameFromUrl(url, modelRoutes);
        if (!resourceName) {
            res.status(404);
            res.end();
            return;
        }
        try {
            const { routeType, resourceId } = utils_1.getRouteType({
                url,
                method,
                resourceName,
            });
            yield (onRequest === null || onRequest === void 0 ? void 0 : onRequest(req, res, {
                routeType,
                resourceId,
                resourceName,
            }));
            const modelConfig = models === null || models === void 0 ? void 0 : models[resourceName];
            const accessibleRoutes = utils_1.getAccessibleRoutes(modelConfig === null || modelConfig === void 0 ? void 0 : modelConfig.only, modelConfig === null || modelConfig === void 0 ? void 0 : modelConfig.exclude);
            if (!accessibleRoutes.includes(routeType)) {
                res.status(404).end();
                return;
            }
            const parsedQuery = queryParser_1.parseQuery(url.split('?')[1]);
            let isPaginated = false;
            if (routeType === types_1.RouteType.READ_ALL) {
                const paginationOptions = utils_1.getPaginationOptions(parsedQuery, pagination);
                if (paginationOptions) {
                    isPaginated = true;
                    utils_1.applyPaginationOptions(parsedQuery, paginationOptions);
                }
            }
            const params = {
                request: req,
                response: res,
                adapter,
                query: adapter.parseQuery(modelName, parsedQuery),
                middlewares,
                resourceName: modelName,
            };
            const resourceIdFormatted = (_d = (_c = modelConfig === null || modelConfig === void 0 ? void 0 : modelConfig.formatResourceId) === null || _c === void 0 ? void 0 : _c.call(modelConfig, resourceId)) !== null && _d !== void 0 ? _d : formatResourceId(resourceId);
            const executeCrud = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    switch (routeType) {
                        case types_1.RouteType.READ_ONE:
                            yield handlers_1.getOneHandler(Object.assign(Object.assign({}, params), { resourceId: resourceIdFormatted }));
                            break;
                        case types_1.RouteType.READ_ALL: {
                            yield handlers_1.getAllHandler(Object.assign(Object.assign({}, params), { paginated: isPaginated }));
                            break;
                        }
                        case types_1.RouteType.CREATE:
                            yield handlers_1.createHandler(Object.assign(Object.assign({}, params), { body }));
                            break;
                        case types_1.RouteType.UPDATE:
                            yield handlers_1.updateHandler(Object.assign(Object.assign({}, params), { resourceId: resourceIdFormatted, body }));
                            break;
                        case types_1.RouteType.DELETE:
                            yield handlers_1.deleteHandler(Object.assign(Object.assign({}, params), { resourceId: resourceIdFormatted }));
                            break;
                    }
                }
                catch (e) {
                    // if (adapter.handleError && !(e instanceof api_utils_1.ApiError)) {
                    //     adapter.handleError(e);
                    // }
                    // else {
                    //     throw e;
                    // }
                    throw e;
                }
            });
            yield ((_e = adapter.connect) === null || _e === void 0 ? void 0 : _e.call(adapter));
            yield executeCrud();
            yield (onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(req, res));
        }
        catch (e) {
            yield (onError === null || onError === void 0 ? void 0 : onError(req, res, e));
            // if (e instanceof api_utils_1.ApiError) {
            //     res.status(e.statusCode).send(e.message);
            // }
            // else {
            res.status(500).send(e.message);
            // }
        }
        finally {
            yield ((_f = adapter.disconnect) === null || _f === void 0 ? void 0 : _f.call(adapter));
            res.end();
        }
    });
    return handler;
}
exports.default = NextCrud;
