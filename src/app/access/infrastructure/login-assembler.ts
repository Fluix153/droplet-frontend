import { Injectable } from '@angular/core';
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { User } from '../domain/models/user.entity';

/**
 * Assembler que convierte entre datos de usuario de la base de datos y entidades User
 */
@Injectable({
  providedIn: 'root'
})
export class LoginAssembler extends BaseAssembler<any, User> {

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
           typeof userData.id === 'string' && userData.id.length > 0 &&
           typeof userData.email === 'string' && userData.email.length > 0 &&
           typeof userData.name === 'string' && userData.name.length > 0 &&
           typeof userData.role === 'string' && userData.role.length > 0;
  }

  /**
   * Valida que la entidad User sea válida
   */
  protected override isValidEntity(entity: User): boolean {
    return entity &&
           typeof entity.id === 'string' && entity.id.length > 0 &&
           typeof entity.email === 'string' && entity.email.length > 0 &&
           typeof entity.name === 'string' && entity.name.length > 0 &&
           typeof entity.role === 'string' && entity.role.length > 0;
  }
}
