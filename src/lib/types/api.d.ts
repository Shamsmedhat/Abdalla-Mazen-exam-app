declare type ErrorResponse = {
  message: string;
  code: number;
};

declare type SuccessResponse<T> = {
  message: strring;
} & T;

declare type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;
