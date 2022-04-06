"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transformDMMF_1 = require("prisma-json-schema-generator/dist/generator/transformDMMF");
const properties_1 = require("prisma-json-schema-generator/dist/generator/properties");
const utils_1 = require("../../swagger/utils");
function getJSONSchemaScalar(fieldType) {
    switch (fieldType) {
        case 'Int':
        case 'BigInt':
            return 'integer';
        case 'DateTime':
        case 'Bytes':
        case 'String':
            return 'string';
        case 'Float':
        case 'Decimal':
            return 'number';
        case 'Json':
            return 'object';
        case 'Boolean':
            return 'boolean';
        case 'Null':
            return 'null';
    }
}
const PAGINATION_SCHEMA_NAME = 'PaginationData';
const methodsNames = [
    { methodStart: 'createOne', schemaNameStart: 'Create' },
    { methodStart: 'updateOne', schemaNameStart: 'Update' },
];
class PrismaJsonSchemaParser {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        this.schemaInputTypes = new Map();
    }
    parseModels() {
        // @ts-ignore
        const modelsDefintions = transformDMMF_1.transformDMMF(this.prismaClient._dmmf).definitions;
        for (const definition in modelsDefintions) {
            const properties = modelsDefintions[definition].properties;
            for (const property in properties) {
                if (Array.isArray(properties[property].type) &&
                    properties[property].type.includes('null')) {
                    properties[property].type = properties[property].type.filter((type) => type !== 'null');
                    if (properties[property].type.length === 1) {
                        properties[property].type = properties[property].type[0];
                    }
                    properties[property].nullable = true;
                }
            }
        }
        return modelsDefintions;
    }
    parseInputTypes(models) {
        const definitions = models.reduce((acc, modelName) => {
            const methods = methodsNames.map((method) => ({
                name: `${method.methodStart}${modelName}`,
                schemaName: `${method.schemaNameStart}${modelName}`,
            }));
            methods.forEach(({ name: method, schemaName }) => {
                const dataFields = 
                // @ts-ignore
                this.prismaClient._dmmf.mutationType.fieldMap[method].args[0]
                    .inputTypes[0].type.fields;
                const requiredProperties = [];
                const properties = dataFields.reduce((propertiesAcc, field) => {
                    if (field.inputTypes[0].kind === 'scalar') {
                        const schema = properties_1.getJSONSchemaProperty(
                        // @ts-ignore
                        this.prismaClient._dmmf.datamodel, {})(Object.assign({ name: field.name }, field.inputTypes[0]));
                        if (schema[1].type && Array.isArray(schema[1].type)) {
                            if (schema[1].type.includes('null')) {
                                propertiesAcc[field.name] = Object.assign(Object.assign({}, schema[1]), { type: schema[1].type.filter((type) => type !== 'null'), nullable: true });
                                if (propertiesAcc[field.name].type.length === 1) {
                                    propertiesAcc[field.name] = Object.assign(Object.assign({}, propertiesAcc[field.name]), { type: propertiesAcc[field.name].type[0] });
                                }
                            }
                        }
                        else {
                            propertiesAcc[field.name] = schema[1];
                        }
                    }
                    else {
                        const typeName = this.parseObjectInputType(field.inputTypes[0]);
                        propertiesAcc[field.name] = Object.assign(Object.assign({}, typeName), { nullable: field.isNullable });
                    }
                    if (field.isRequired) {
                        requiredProperties.push(field.name);
                    }
                    return propertiesAcc;
                }, {});
                acc[schemaName] = {
                    type: 'object',
                    properties,
                };
                if (requiredProperties.length) {
                    acc[schemaName].required = requiredProperties;
                }
            });
            return acc;
        }, {});
        for (const [key, value] of this.schemaInputTypes.entries()) {
            definitions[key] = {
                type: 'object',
                properties: value,
            };
        }
        return definitions;
    }
    formatInputTypeData(inputType) {
        if (inputType.kind === 'object') {
            const ref = utils_1.formatSchemaRef(inputType.type.name);
            if (inputType.isList) {
                return {
                    type: 'array',
                    items: {
                        $ref: ref,
                    },
                };
            }
            return { $ref: ref };
        }
        else {
            const type = getJSONSchemaScalar(inputType.type);
            if (inputType.isList) {
                return {
                    type: 'array',
                    items: {
                        type,
                    },
                };
            }
            return { type };
        }
    }
    parseObjectInputType(fieldType) {
        if (fieldType.kind === 'object') {
            if (!this.schemaInputTypes.has(fieldType.type.name)) {
                this.schemaInputTypes.set(fieldType.type.name, {});
                fieldType.type.fields.forEach((field) => {
                    let fieldData = {};
                    if (field.inputTypes.length > 1) {
                        let nullable = false;
                        const anyOf = field.inputTypes
                            .map((inputType) => {
                            const inputTypeData = this.formatInputTypeData(inputType);
                            if (inputTypeData.type === 'null') {
                                nullable = true;
                                return undefined;
                            }
                            return inputTypeData;
                        })
                            .filter(Boolean);
                        if (anyOf.length === 1) {
                            fieldData = anyOf[0];
                        }
                        else {
                            fieldData.anyOf = anyOf;
                        }
                        if (nullable) {
                            fieldData.nullable = true;
                        }
                    }
                    else {
                        const inputType = field.inputTypes[0];
                        fieldData = this.formatInputTypeData(inputType);
                    }
                    this.schemaInputTypes.set(fieldType.type.name, Object.assign(Object.assign({}, this.schemaInputTypes.get(fieldType.type.name)), { [field.name]: fieldData }));
                    field.inputTypes.forEach((inputType) => {
                        if (inputType.kind === 'object') {
                            this.parseObjectInputType(inputType);
                        }
                    });
                });
            }
            return { $ref: utils_1.formatSchemaRef(fieldType.type.name) };
        }
        return { type: getJSONSchemaScalar(fieldType.type) };
    }
    getPaginationDataSchema() {
        return {
            [PAGINATION_SCHEMA_NAME]: {
                type: 'object',
                properties: {
                    total: {
                        type: 'integer',
                        minimum: 0,
                        description: 'Total number of elements in the collection',
                    },
                    pageCount: {
                        type: 'integer',
                        minimum: 0,
                        description: 'Total number of pages',
                    },
                    page: {
                        type: 'integer',
                        minimum: 0,
                        description: 'Current page number',
                    },
                },
            },
        };
    }
    getPaginatedModelsSchemas(modelNames) {
        return modelNames.reduce((acc, modelName) => {
            return Object.assign(Object.assign({}, acc), { [`${modelName}Page`]: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array',
                            items: {
                                $ref: utils_1.formatSchemaRef(modelName),
                            },
                        },
                        pagination: {
                            $ref: utils_1.formatSchemaRef(PAGINATION_SCHEMA_NAME),
                        },
                    },
                } });
        }, {});
    }
}
exports.default = PrismaJsonSchemaParser;
