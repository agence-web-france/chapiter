import { RouteType, TSwaggerParameter } from '../types';
export declare const commonQueryParams: TSwaggerParameter[];
export declare const listQueryParams: TSwaggerParameter[];
export declare const getQueryParams: (routeType: RouteType, additionalQueryParams?: TSwaggerParameter[]) => TSwaggerParameter[];
