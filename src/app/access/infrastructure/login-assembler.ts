import { Injectable } from '@angular/core';
import { User } from '../domain/models/user.entity';

/**
 * Assembler que convierte entre datos de usuario de la base de datos y entidades User
 */
@Injectable({
  providedIn: 'root'
})
export class LoginAssembler {

  /**
   * Convierte un usuario de la base de datos en una entidad de dominio User
   */
  toEntity(userData: any): User {
    if (!this.isValidUserData(userData)) {
      throw new Error('DTO de usuario inválido');
    }

    return new User(
      userData.id,
      userData.name,
      userData.email,
      userData.role,
      userData.phone
    );
  }

  /**
   * Convierte una entidad User en datos para la base de datos
   */
  toDto(entity: User): any {
    if (!this.isValidEntity(entity)) {
      throw new Error('Entidad User inválida');
    }

    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      role: entity.role,
      phone: entity.phone
    };
  }

  /**
   * Valida que los datos del usuario tengan los campos mínimos requeridos
   */
  private isValidUserData(userData: any): boolean {
    return userData &&
      userData.id !== undefined &&
      typeof userData.name === 'string' &&
      typeof userData.email === 'string' &&
      typeof userData.role === 'string';
  }

  /**
   * Valida que la entidad User sea válida
   */
  private isValidEntity(entity: User): boolean {
    return entity instanceof User &&
      entity.id !== undefined &&
      typeof entity.name === 'string' &&
      typeof entity.email === 'string' &&
      typeof entity.role === 'string';
  }
}
