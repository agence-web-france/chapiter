import { RouteType, TModelsOptions, TSwaggerTag, TSwaggerModelsConfig } from '../types';
export declare const generatePathByRouteType: (resourceName: string, routeType: RouteType) => string;
export declare const generateMethodForRouteType: (routeType: RouteType) => "post" | "get" | "put" | "delete";
export declare const formatSchemaRef: (schemaName: string) => string;
declare type TRoutes<M extends string> = {
    [key in M]?: RouteType[];
};
export declare const getModelsAccessibleRoutes: <M extends string>(modelNames: M[], models?: TModelsOptions<M>) => TRoutes<M>;
export declare const getSwaggerTags: <M extends string>(modelNames: M[], modelsConfig?: TSwaggerModelsConfig<M>) => TSwaggerTag[];
interface IGetSwaggerPathsParams<M extends string> {
    routes: TRoutes<M>;
    modelsConfig?: TSwaggerModelsConfig<M>;
    models?: TModelsOptions<M>;
    routesMap?: {
        [key in M]?: string;
    };
}
export declare const getSwaggerPaths: <M extends string>({ routes, models, modelsConfig, routesMap, }: IGetSwaggerPathsParams<M>) => {};
export {};
