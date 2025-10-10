/**
 * Clase base abstracta para convertir DTOs en entidades de dominio.
 * @template TDto - Tipo del DTO de entrada
 * @template TEntity - Tipo de la entidad de dominio de salida
 */
export abstract class BaseAssembler<TDto, TEntity> {
  /**
   * Convierte un DTO en una entidad de dominio.
   * @param dto - El DTO a convertir
   * @returns La entidad de dominio
   */
  abstract toEntity(dto: TDto): TEntity;

  /**
   * Convierte una lista de DTOs en una lista de entidades de dominio.
   * @param dtos - Los DTOs a convertir
   * @returns Las entidades de dominio
   */
  toEntityList(dtos: TDto[]): TEntity[] {
    return dtos.map(dto => this.toEntity(dto));
  }
}
