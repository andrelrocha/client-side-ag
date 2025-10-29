interface ErrorResponseDTO {
  name: string;
  message: string;
}

export interface ApiResponseDTO<T> {
  data: T | null;
  error: ErrorResponseDTO | null;
}

export interface MessageResponseDTO {
  message: string;
}
