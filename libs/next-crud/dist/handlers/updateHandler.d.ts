import { IUniqueResourceHandlerParams } from '../types';
interface IUpdateHandler<T, Q> extends IUniqueResourceHandlerParams<T, Q> {
    body: Partial<T>;
}
declare function updateHandler<T, Q>({ adapter, response, body, resourceId, resourceName, query, middlewares, request, }: IUpdateHandler<T, Q>): Promise<void>;
export default updateHandler;
