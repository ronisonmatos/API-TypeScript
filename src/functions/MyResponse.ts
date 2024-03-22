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
}

export default {
  sendResponse(
    response: Response,
    code: number,
    status: string,
    data?: any,
    statusCode?: number,
    pagination?: IResponsePagination,
  ) {
    response.statusCode = statusCode || 200;

    var result: IResponse = {
      code,
      status,
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

  sendSuccess(response: Response, data: any, pagination?: IResponsePagination) {
    this.sendResponse(response, 200, "ok", data, 200, pagination);
  },

  sendInvalidSyntax(response: Response, data?: any) {
    this.sendResponse(response, 400, "invalid syntax", data, 400);
  },

  sendUnauthorized(response: Response, data?: any) {
    this.sendResponse(response, 401, "unauthorized", data, 401);
  },

  sendNotFound(response: Response, data?: any) {
    this.sendResponse(response, 404, "not found", data, 404);
  },

  sendInternalError(response: Response, data?: any) {
    this.sendResponse(response, 500, "internal error", data, 500);
  },

  sendBadGateway(response: Response, data?: any) {
    this.sendResponse(response, 502, "bad gateway", data, 502);
  },

  sendServiceUnavailable(response: Response, data?: any) {
    this.sendResponse(response, 503, "service unavailable", data, 503);
  },
};
