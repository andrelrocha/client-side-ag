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

export interface PageableResponseDTO {
  content: any[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    },
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Page<T> extends PageableResponseDTO {
  content: T[];
}
