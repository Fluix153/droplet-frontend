import { Injectable } from '@angular/core';
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { User } from '../domain/models/user.entity';

/**
 * Assembler para operaciones de registro
 * Convierte entre DTOs de registro y entidades de dominio
 */
@Injectable({
  providedIn: 'root'
})
export class RegisterAssembler extends BaseAssembler<any, User> {

  /**
   * Convierte de DTO a entidad de dominio
   */
  toEntity(dto: any): User {
    return new User(
      dto.id,
      dto.name,
      dto.email,
      dto.role,
      dto.phone
    );
  }

  /**
   * Convierte de entidad de dominio a DTO
   */
  toDto(entity: User): any {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      role: entity.role,
      phone: entity.phone || ''
    };
  }
}
