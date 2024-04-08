import { Response } from "express";

export interface IResponsePagination {
  page: number;
  size: number;
  count: number;
}

interface IResponse {
  code: number;
  status: string;
  data?: any;
  page?: number;
  size?: number;
  count?: number;
  token?: any
}

export default {
  sendResponse(
    response: Response,
    code: number,
    status: string,
    data?: any,
    statusCode?: number,
    pagination?: IResponsePagination,
    token?: any
  ) {
    response.statusCode = statusCode || 200;

    let result: IResponse = {
      code,
      status,
      token,
    };

    if (data !== undefined && data !== null) {
      result = { ...result, data };
    }

    if (pagination !== undefined && pagination !== null) {
      result = { ...result, page: pagination.page, size: pagination.size, count: pagination.count };
    }

    response.json(result);
    response.end();
  },

  sendSuccess(response: Response, data: any, statusMessage = "ok", token?: any, pagination?: IResponsePagination) {
    this.sendResponse(response, 200, statusMessage, data, 200, pagination, token);
  },

  sendInvalidSyntax(response: Response, data?: any, statusMessage = "invalid syntax") {
    this.sendResponse(response, 400, statusMessage, data, 400);
  },

  sendUnauthorized(response: Response, data?: any, statusMessage = "unauthorized") {
    this.sendResponse(response, 401, statusMessage, data, 401);
  },

  sendNotFound(response: Response, data?: any, statusMessage = "not found") {
    this.sendResponse(response, 404, statusMessage, data, 404);
  },

  sendInternalError(response: Response, statusMessage = "internal error") {
    this.sendResponse(response, 500, statusMessage, 500);
  },

  sendBadGateway(response: Response, data?: any, statusMessage = "bad gateway") {
    this.sendResponse(response, 502, statusMessage, data, 502);
  },

  sendServiceUnavailable(response: Response, data?: any, statusMessage = "service unavailable") {
    this.sendResponse(response, 503, statusMessage, data, 503);
  },
};
