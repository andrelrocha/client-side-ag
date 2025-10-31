export interface SignInRequestDTO {
  login: string;
  password: string;
}

export interface TokenResponseDTO {
  token: string;
}

export interface ForgotPasswordRequestDTO {
  email: string;
}
