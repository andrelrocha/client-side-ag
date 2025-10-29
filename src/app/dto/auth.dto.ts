export interface SignInRequestDTO {
  login: string;
  password: string;
}

export interface SignInResponseDTO {
  token: string;
}

export interface ForgotPasswordRequestDTO {
  email: string;
}
