import { PrismaClient } from '@prisma/client';
declare class PrismaJsonSchemaParser {
    private prismaClient;
    schemaInputTypes: Map<string, any>;
    constructor(prismaClient: PrismaClient);
    parseModels(): any;
    parseInputTypes(models: string[]): {};
    formatInputTypeData(inputType: any): {
        type: string;
        items: {
            $ref: string;
            type?: undefined;
        };
        $ref?: undefined;
    } | {
        $ref: string;
        type?: undefined;
        items?: undefined;
    } | {
        type: string;
        items: {
            type: string;
            $ref?: undefined;
        };
        $ref?: undefined;
    } | {
        type: string;
        items?: undefined;
        $ref?: undefined;
    };
    parseObjectInputType(fieldType: any): {
        $ref: string;
        type?: undefined;
    } | {
        type: string;
        $ref?: undefined;
    };
    getPaginationDataSchema(): {
        PaginationData: {
            type: string;
            properties: {
                total: {
                    type: string;
                    minimum: number;
                    description: string;
                };
                pageCount: {
                    type: string;
                    minimum: number;
                    description: string;
                };
                page: {
                    type: string;
                    minimum: number;
                    description: string;
                };
            };
        };
    };
    getPaginatedModelsSchemas(modelNames: string[]): {};
}
export default PrismaJsonSchemaParser;
