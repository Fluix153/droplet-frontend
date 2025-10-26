/**
 * DTO que representa la respuesta de login desde la API
 */
export interface LoginResponseDto {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role?: string;
  };
}

/**
 * DTO de credenciales para login
 */
export interface LoginCredentialsDto {
  email: string;
  password: string;
}
