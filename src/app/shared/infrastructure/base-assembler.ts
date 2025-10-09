/**
 * Contrato genérico para los assemblers (traductores)
 * Define la estructura que deben seguir todos los traductores entre DTOs y Entities
 *
 * @template DTO - Tipo del objeto de transferencia de datos
 * @template Entity - Tipo de la entidad de dominio
 */
export interface Assembler<DTO, Entity> {
  /**
   * Convierte un DTO en una entidad de dominio
   * @param dto - Objeto de transferencia de datos
   * @returns Entidad de dominio
   */
  toEntity(dto: DTO): Entity;

  /**
   * Convierte una entidad de dominio en un DTO
   * @param entity - Entidad de dominio
   * @returns Objeto de transferencia de datos
   */
  toDto(entity: Entity): DTO;
}

/**
 * Clase base abstracta para assemblers que proporciona funcionalidad común
 * Los assemblers específicos pueden heredar de esta clase si necesitan lógica compartida
 */
export abstract class BaseAssembler<DTO, Entity> implements Assembler<DTO, Entity> {
  abstract toEntity(dto: DTO): Entity;
  abstract toDto(entity: Entity): DTO;

  /**
   * Convierte una lista de DTOs en una lista de entidades
   * @param dtos - Lista de DTOs
   * @returns Lista de entidades
   */
  toEntities(dtos: DTO[]): Entity[] {
    return dtos.map(dto => this.toEntity(dto));
  }

  /**
   * Convierte una lista de entidades en una lista de DTOs
   * @param entities - Lista de entidades
   * @returns Lista de DTOs
   */
  toDtos(entities: Entity[]): DTO[] {
    return entities.map(entity => this.toDto(entity));
  }

  /**
   * Valida si un DTO tiene la estructura mínima requerida
   * Los assemblers específicos pueden sobrescribir este método
   * @param dto - DTO a validar
   * @returns true si es válido, false en caso contrario
   */
  protected isValidDto(dto: DTO): boolean {
    return dto !== null && dto !== undefined;
  }

  /**
   * Valida si una entidad tiene la estructura mínima requerida
   * Los assemblers específicos pueden sobrescribir este método
   * @param entity - Entidad a validar
   * @returns true si es válida, false en caso contrario
   */
  protected isValidEntity(entity: Entity): boolean {
    return entity !== null && entity !== undefined;
  }
}
