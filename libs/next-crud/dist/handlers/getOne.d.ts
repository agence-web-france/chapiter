import { IUniqueResourceHandlerParams } from '../types';
interface IGetOneHandler<T, Q> extends IUniqueResourceHandlerParams<T, Q> {
}
declare function getOneHandler<T, Q>({ adapter, response, resourceId, resourceName, query, middlewares, request, }: IGetOneHandler<T, Q>): Promise<void>;
export default getOneHandler;
