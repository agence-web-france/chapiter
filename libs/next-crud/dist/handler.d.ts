import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { IAdapter, TMiddleware, IPaginationConfig, TModelsOptions, TSwaggerConfig } from './types';
import { GetRouteType } from './utils';
declare type TCallback<T extends any = undefined> = (req: NextApiRequest, res: NextApiResponse, options?: T) => void | Promise<void>;
declare type TErrorCallback = (req: NextApiRequest, res: NextApiResponse, error: any) => void | Promise<void>;
interface INextCrudOptions<T, Q, M extends string = string> {
    adapter: IAdapter<T, Q, M>;
    formatResourceId?: (resourceId: string) => string | number;
    onRequest?: TCallback<GetRouteType & {
        resourceName: string;
    }>;
    onSuccess?: TCallback;
    onError?: TErrorCallback;
    middlewares?: TMiddleware<T>[];
    pagination?: IPaginationConfig;
    models?: TModelsOptions<M>;
    swagger?: TSwaggerConfig<M>;
}
declare function NextCrud<T, Q = any, M extends string = string>({ adapter, models, formatResourceId, onRequest, onSuccess, onError, middlewares, pagination, swagger, }: INextCrudOptions<T, Q, M>): NextApiHandler<T>;
export default NextCrud;
