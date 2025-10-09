/**
 * Entidad de dominio que representa un usuario en el sistema
 */
export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly role?: string
  ) {}

  /**
   * Verifica si el usuario tiene un rol específico
   */
  hasRole(role: string): boolean {
    return this.role === role;
  }

  /**
   * Obtiene el nombre para mostrar del usuario
   */
  getDisplayName(): string {
    return this.name || this.email;
  }

  /**
   * Verifica si el usuario es administrador
   */
  isAdmin(): boolean {
    return this.hasRole('admin');
  }
}
