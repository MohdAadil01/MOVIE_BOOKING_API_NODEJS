export interface ApiSuccess<T> {
  success: true;
  statusCode: number;
  message: String;
  data: T | String;
}

export interface ApiError {
  success: false;
  statusCode: number;
  message: String;
  error?: unknown;
}
export class ApiResponse {
  static success<T>(options: {
    statusCode: number;
    message: String;
    data: T;
  }): ApiSuccess<T> {
    const { statusCode, message, data } = options;
    return {
      success: true,
      statusCode,
      message,
      data,
    };
  }
  static error(options: {
    statusCode: number;
    message: String;
    error?: unknown;
  }): ApiError {
    const { statusCode, message, error } = options;
    return {
      success: false,
      statusCode,
      message,
      error,
    };
  }
}
