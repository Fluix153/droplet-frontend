import { Injectable } from '@angular/core';
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { User } from '../domain/models/user.entity';
import { LoginResponseDto } from './login-response';

/**
 * Assembler que convierte entre DTOs de login y entidades User
 */
@Injectable({
  providedIn: 'root'
})
export class LoginAssembler extends BaseAssembler<LoginResponseDto['user'], User> {

  /**
   * Convierte un DTO de usuario en una entidad de dominio User
   */
  toEntity(dto: LoginResponseDto['user']): User {
    if (!this.isValidDto(dto)) {
      throw new Error('DTO de usuario inválido');
    }

    return new User(
      dto.id,
      dto.email,
      dto.name,
      dto.role
    );
  }

  /**
   * Convierte una entidad User en un DTO
   */
  toDto(entity: User): LoginResponseDto['user'] {
    if (!this.isValidEntity(entity)) {
      throw new Error('Entidad User inválida');
    }

    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      role: entity.role
    };
  }

  /**
   * Valida que el DTO tenga los campos mínimos requeridos
   */
  protected override isValidDto(dto: LoginResponseDto['user']): boolean {
    return super.isValidDto(dto) &&
           !!dto.id &&
           !!dto.email &&
           !!dto.name;
  }
}
