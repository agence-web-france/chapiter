import { PrismaClient } from '@prisma/client';
import { IAdapter, IParsedQueryParams, TPaginationData } from '../../types';
import { IPrismaParsedQueryParams } from './types';
interface IAdapterCtorArgs<M extends string = string> {
    primaryKey?: string;
    manyRelations?: {
        [key in M]?: string[];
    };
    prismaClient: PrismaClient;
    models?: M[];
}
export default class PrismaAdapter<T, M extends string> implements IAdapter<T, IPrismaParsedQueryParams, M> {
    private primaryKey;
    private manyRelations;
    private prismaClient;
    models: M[];
    private prismaJsonSchemaParser;
    constructor({ primaryKey, prismaClient, manyRelations, models, }: IAdapterCtorArgs<M>);
    getPaginationData(resourceName: M, query: IPrismaParsedQueryParams): Promise<TPaginationData>;
    handleError(err: Error): void;
    parseQuery(resourceName: M, query?: IParsedQueryParams): IPrismaParsedQueryParams;
    getAll(resourceName: M, query?: IPrismaParsedQueryParams): Promise<T[]>;
    getOne(resourceName: M, resourceId: string | number, query?: IPrismaParsedQueryParams): Promise<T>;
    create(resourceName: M, data: any, query?: IPrismaParsedQueryParams): Promise<T>;
    update(resourceName: M, resourceId: string | number, data: any, query?: IPrismaParsedQueryParams): Promise<T>;
    delete(resourceName: M, resourceId: string | number, query?: IPrismaParsedQueryParams): Promise<T>;
    connect(): Promise<void>;
    disconnect(): Promise<any>;
    get client(): PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, boolean | ((error: Error) => Error) | import(".prisma/client").Prisma.RejectPerOperation>;
    getModels(): M[];
    getModelsJsonSchema(): any;
    private getPrismaDelegate;
    mapModelsToRouteNames(): { [key in M]?: string; };
}
export {};
