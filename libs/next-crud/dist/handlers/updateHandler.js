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
const httpError_1 = __importDefault(require("../httpError"));
const utils_1 = require("../utils");
function updateHandler({ adapter, response, body, resourceId, resourceName, query, middlewares, request, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const resource = yield adapter.getOne(resourceName, resourceId, query);
        if (resource) {
            const updatedResource = yield adapter.update(resourceName, resourceId, body, query);
            yield utils_1.executeMiddlewares([
                ...middlewares,
                ({ result }) => {
                    response.send(result);
                },
            ], {
                req: request,
                res: response,
                result: updatedResource,
            });
        }
        else {
            throw new httpError_1.default(404, `${resourceName} ${resourceId} not found`);
        }
    });
}
exports.default = updateHandler;
