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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const httpError_1 = __importDefault(require("../../httpError"));
const parseCursor_1 = require("./utils/parseCursor");
const parseOrderBy_1 = require("./utils/parseOrderBy");
const parseRecursive_1 = require("./utils/parseRecursive");
const parseWhere_1 = require("./utils/parseWhere");
const jsonSchemaParser_1 = __importDefault(require("./jsonSchemaParser"));
class PrismaAdapter {
    constructor({ primaryKey = 'id', prismaClient, manyRelations = {}, models, }) {
        var _a;
        this.prismaClient = prismaClient;
        this.primaryKey = primaryKey;
        this.manyRelations = manyRelations;
        // @ts-ignore
        const prismaDmmfModels = (_a = prismaClient._dmmf) === null || _a === void 0 ? void 0 : _a.mappingsMap;
        if (typeof models !== 'undefined') {
            models.forEach((model) => {
                if (!Object.keys(prismaDmmfModels).includes(model)) {
                    throw new Error(`Model name ${model} is invalid.`);
                }
            });
        }
        this.models =
            // @ts-ignore
            models ||
                // @ts-ignore
                Object.keys(prismaDmmfModels); // Retrieve model names from dmmf for prisma v2
        this.prismaJsonSchemaParser = new jsonSchemaParser_1.default(this.prismaClient);
    }
    getPaginationData(resourceName, query) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const total = yield this.getPrismaDelegate(resourceName).count({
                where: query.where,
                distinct: query.distinct,
            });
            return {
                total,
                pageCount: Math.ceil(total / query.take),
                page: Math.ceil(query.skip / query.take) + 1,
            };
        });
    }
    handleError(err) {
        console.error(err.message);
        if (err instanceof client_1.PrismaClientKnownRequestError ||
            err instanceof client_1.PrismaClientValidationError) {
            throw new httpError_1.default(400, 'invalid request, check your server logs for more info');
        }
        else {
            throw new httpError_1.default(500, 'an unknown error occured, check your server logs for more info');
        }
    }
    parseQuery(resourceName, query) {
        var _a, _b, _c;
        const parsed = {};
        if (query.select) {
            parsed.select = parseRecursive_1.parsePrismaRecursiveField(query.select, 'select');
        }
        if (query.include) {
            parsed.include = parseRecursive_1.parsePrismaRecursiveField(query.include, 'include');
        }
        if ((_a = query.originalQuery) === null || _a === void 0 ? void 0 : _a.where) {
            parsed.where = parseWhere_1.parsePrismaWhere(JSON.parse(query.originalQuery.where), (_b = this.manyRelations[resourceName]) !== null && _b !== void 0 ? _b : []);
        }
        if (query.orderBy) {
            parsed.orderBy = parseOrderBy_1.parsePrismaOrderBy(query.orderBy);
        }
        if (typeof query.limit !== 'undefined') {
            parsed.take = query.limit;
        }
        if (typeof query.skip !== 'undefined') {
            parsed.skip = query.skip;
        }
        if ((_c = query.originalQuery) === null || _c === void 0 ? void 0 : _c.cursor) {
            parsed.cursor = parseCursor_1.parsePrismaCursor(JSON.parse(query.originalQuery.cursor));
        }
        if (query.distinct) {
            parsed.distinct = query.distinct;
        }
        return parsed;
    }
    getAll(resourceName, query) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const results = yield this.getPrismaDelegate(resourceName).findMany({
                select: query.select,
                include: query.include,
                where: query.where,
                orderBy: query.orderBy,
                cursor: query.cursor,
                take: query.take,
                skip: query.skip,
                distinct: query.distinct,
            });
            return results;
        });
    }
    getOne(resourceName, resourceId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const delegate = this.getPrismaDelegate(resourceName);
            /**
             * On prisma v2.12, findOne has been deprecated in favor of findUnique
             * We use findUnique in priority only if it's available
             */
            const findFn = delegate.findUnique || delegate.findOne;
            const resource = yield findFn({
                where: {
                    [this.primaryKey]: resourceId,
                },
                select: query.select,
                include: query.include,
            });
            return resource;
        });
    }
    create(resourceName, data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdResource = yield this.getPrismaDelegate(resourceName).create({
                data,
                select: query.select,
                include: query.include,
            });
            return createdResource;
        });
    }
    update(resourceName, resourceId, data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedResource = yield this.getPrismaDelegate(resourceName).update({
                where: {
                    [this.primaryKey]: resourceId,
                },
                data,
                select: query.select,
                include: query.include,
            });
            return updatedResource;
        });
    }
    delete(resourceName, resourceId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedResource = yield this.getPrismaDelegate(resourceName).delete({
                where: {
                    [this.primaryKey]: resourceId,
                },
                select: query.select,
                include: query.include,
            });
            return deletedResource;
        });
    }
    connect() {
        return this.prismaClient.$connect();
    }
    disconnect() {
        return this.prismaClient.$disconnect();
    }
    get client() {
        return this.prismaClient;
    }
    getModels() {
        return this.models;
    }
    getModelsJsonSchema() {
        // @ts-ignore
        const definitions = this.prismaJsonSchemaParser.parseModels();
        const models = Object.keys(definitions);
        const inputs = this.prismaJsonSchemaParser.parseInputTypes(models);
        const schema = JSON.stringify(Object.assign(Object.assign(Object.assign(Object.assign({}, definitions), inputs), this.prismaJsonSchemaParser.getPaginationDataSchema()), this.prismaJsonSchemaParser.getPaginatedModelsSchemas(models)));
        const defs = schema.replace(/#\/definitions/g, '#/components/schemas');
        return JSON.parse(defs);
    }
    getPrismaDelegate(resourceName) {
        // @ts-ignore
        return this.prismaClient[`${resourceName.charAt(0).toLowerCase()}${resourceName.slice(1)}`];
    }
    mapModelsToRouteNames() {
        const models = this.getModels();
        const routesMap = {};
        for (const model of models) {
            // @ts-ignore
            routesMap[model] = this.prismaClient._dmmf.mappingsMap[model].plural;
        }
        return routesMap;
    }
}
exports.default = PrismaAdapter;
