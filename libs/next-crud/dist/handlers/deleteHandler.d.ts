import { IUniqueResourceHandlerParams } from '../types';
interface IDeleteHandler<T, Q> extends IUniqueResourceHandlerParams<T, Q> {
}
declare function deleteHandler<T, Q>({ adapter, response, resourceId, resourceName, query, request, middlewares, }: IDeleteHandler<T, Q>): Promise<void>;
export default deleteHandler;
