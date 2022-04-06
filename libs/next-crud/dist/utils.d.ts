import { RouteType, TMiddleware, TMiddlewareContext, IPaginationConfig, IParsedQueryParams, TPaginationOptions } from './types';
interface GetRouteTypeParams {
    method: string;
    url: string;
    resourceName: string;
}
export interface GetRouteType {
    routeType: RouteType | null;
    resourceId?: string;
}
export declare const getRouteType: ({ method, url, resourceName, }: GetRouteTypeParams) => GetRouteType | null;
export declare const formatResourceId: (resourceId: string) => string | number;
export declare const isPrimitive: (value: any) => boolean;
export declare const executeMiddlewares: <T extends unknown>(middlewares: TMiddleware<T>[], ctx: TMiddlewareContext<T>) => Promise<void>;
export declare const getPaginationOptions: (query: IParsedQueryParams, paginationConfig: IPaginationConfig) => TPaginationOptions | null;
export declare const applyPaginationOptions: (query: IParsedQueryParams, paginationOptions: TPaginationOptions) => void;
export declare const ensureCamelCase: (str: string) => string;
export declare const getResourceNameFromUrl: <M extends string = string>(url: string, models: { [key in M]?: string; }) => {
    modelName: M;
    resourceName: string;
};
export declare const getAccessibleRoutes: (only?: RouteType[], exclude?: RouteType[]) => RouteType[];
export {};
