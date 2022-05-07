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
const utils_1 = require("../utils");
function getAllHandler({ adapter, response, query, middlewares, request, paginated, resourceName, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const resources = yield adapter.getAll(resourceName, query);
        let dataResponse = resources;
        if (paginated) {
            const paginationData = yield adapter.getPaginationData(resourceName, query);
            dataResponse = {
                data: resources,
                pagination: paginationData,
            };
        }
        yield utils_1.executeMiddlewares(
        // @ts-ignore
        [
            // @ts-ignore
            ...middlewares,
            // @ts-ignore
            ({ result }) => {
                response.send(result);
            },
        ], {
            req: request,
            res: response,
            result: dataResponse,
        });
    });
}
exports.default = getAllHandler;