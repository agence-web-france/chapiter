import { IHandlerParams } from '../types';
interface IGetAllHandler<T, Q> extends IHandlerParams<T, Q> {
    paginated: boolean;
}
declare function getAllHandler<T, Q>({ adapter, response, query, middlewares, request, paginated, resourceName, }: IGetAllHandler<T, Q>): Promise<void>;
export default getAllHandler;
