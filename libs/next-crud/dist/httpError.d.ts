import { ApiError } from 'next/dist/next-server/server/api-utils';
export default class HttpError extends ApiError {
    statusCode: number;
    constructor(code: number, message?: string);
}
