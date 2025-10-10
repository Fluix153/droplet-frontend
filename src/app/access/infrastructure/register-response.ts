/**
 * DTO para las credenciales de registro
 */
export interface RegisterCredentialsDto {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
}

/**
 * DTO para la respuesta del registro
 */
export interface RegisterResponseDto {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
}
