import { NextResponse } from "next/server";

export type ApiResponseMeta = {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  [key: string]: unknown;
};

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  meta?: ApiResponseMeta;
  timestamp: string;
};

export function apiSuccess<T>(data: T, meta?: ApiResponseMeta, status = 200) {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      data,
      meta,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

export function apiError(message: string, status = 400, details?: unknown) {
  return NextResponse.json<ApiResponse>(
    {
      success: false,
      error: message,
      meta: details ? { details } : undefined,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}
