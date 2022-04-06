import type { TSearchCondition } from '../../types';
export declare type TPrismaRecursiveField = 'select' | 'include';
export declare type TPrismaRecursive<T extends TPrismaRecursiveField> = Record<string, boolean | {
    [key in T]: TPrismaRecursive<T>;
}>;
export declare type TPrismaWhereOperator = 'equals' | 'not' | 'in' | 'notIn' | 'lt' | 'lte' | 'gt' | 'gte' | 'contains' | 'startsWith' | 'endsWith';
export declare type TPrismaOrderByOperator = 'asc' | 'desc';
export declare type TPrismaFieldFilterOperator = {
    [key in TPrismaWhereOperator]?: TSearchCondition;
};
export declare type TPrismaFieldFilter = {
    [key: string]: TSearchCondition | TPrismaFieldFilterOperator | TPrismaRelationFitler;
};
export declare type TPrismaWhereField = TPrismaFieldFilter & {
    AND?: TPrismaFieldFilter;
    OR?: TPrismaFieldFilter;
    NOT?: TPrismaFieldFilter;
};
export declare type TPrismaRelationFitler = {
    some: TSearchCondition | TPrismaFieldFilter;
};
export declare type TPrismaOrderBy = {
    [key: string]: TPrismaOrderByOperator;
};
export declare type TPrismaCursor = {
    [key: string]: string | number | boolean;
};
export interface IPrismaParsedQueryParams {
    select?: TPrismaRecursive<'select'>;
    include?: TPrismaRecursive<'include'>;
    where?: TPrismaWhereField;
    orderBy?: TPrismaOrderBy;
    take?: number;
    skip?: number;
    cursor?: TPrismaCursor;
    distinct?: string;
}
