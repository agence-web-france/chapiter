import { TRecursiveField } from '../../../types';
import { TPrismaRecursive, TPrismaRecursiveField } from '../types';
export declare const parsePrismaRecursiveField: <T extends TPrismaRecursiveField>(select: TRecursiveField, fieldName: T) => Record<string, boolean | { [key in T]: Record<string, boolean | any>; }>;
