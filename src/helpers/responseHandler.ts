import { NextFunction, Request, Response } from 'express';
import {
    ApiServiceResponse,
    DataTableDaoResponse,
    DataTableResponse,
} from '../types/apiServiceResponse';

const logError = (err: any) => {
    console.error(err);
};

const logErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    logError(err);
    next(err);
};

export const returnError = (statusCode: number, message: string) => {
    const response: ApiServiceResponse = {
        statusCode,
        response: {
            status: false,
            code: statusCode,
            message,
        },
    };
    return response;
};
const returnSuccess = (statusCode: number, message: string, data?: [] | object) => {
    const response: ApiServiceResponse = {
        statusCode,
        response: {
            status: true,
            code: statusCode,
            message,
            data,
        },
    };
    return response;
};

const getPaginationData = (rows: DataTableDaoResponse, page: number, limit: number) => {
    const { count: totalItems, rows: data } = rows;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    const response: DataTableResponse = {
        totalItems,
        data,
        totalPages,
        currentPage,
    };
    return response;
};

export default {
    logError,
    logErrorMiddleware,
    returnError,
    returnSuccess,
    getPaginationData,
};
