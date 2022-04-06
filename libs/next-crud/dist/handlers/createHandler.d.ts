import { IHandlerParams } from '../types';
interface ICreateHandler<T, Q> extends IHandlerParams<T, Q> {
    body: Record<string, any>;
}
declare function createHandler<T, Q>({ adapter, response, body, query, request, middlewares, resourceName, }: ICreateHandler<T, Q>): Promise<void>;
export default createHandler;
