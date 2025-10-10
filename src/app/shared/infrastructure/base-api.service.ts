import { Observable } from 'rxjs';

/**
 * Contrato genérico para todos los servicios de API
 * Define los métodos básicos que deben implementar los servicios de datos
 */
export abstract class BaseApiService<T> {
  /**
   * Obtiene todos los elementos
   */
  abstract getAll(): Observable<T[]>;

  /**
   * Obtiene un elemento por su ID
   * @param id - Identificador del elemento
   */
  abstract getById(id: string): Observable<T>;

  /**
   * Crea un nuevo elemento
   * @param item - Elemento a crear
   */
  abstract create(item: Partial<T>): Observable<T>;

  /**
   * Actualiza un elemento existente
   * @param id - Identificador del elemento
   * @param item - Datos actualizados del elemento
   */
  abstract update(id: string, item: Partial<T>): Observable<T>;

  /**
   * Elimina un elemento
   * @param id - Identificador del elemento
   */
  abstract delete(id: string): Observable<void>;
}
