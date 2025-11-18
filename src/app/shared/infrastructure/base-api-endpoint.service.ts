import {BaseEntity} from './base-entity';
import {BaseResource, BaseResponse} from './base-response';
import {BaseAssembler} from './base-assembler';
import {HttpBackend, HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';

/**
 * Abstract base class for API endpoints providing standard CRUD operations.
 * @template TEntity - The type of the entity, must extend BaseEntity.
 * @template TResource - The type of the resource, must extend BaseResource.
 * @template TResponse - The type of the response, must extend BaseResponse.
 * @template TAssembler - The type of the assembler, must extend BaseAssembler.
 */
export abstract class BaseApiEndpointService<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse,
  TAssembler extends BaseAssembler<TEntity, TResource, TResponse>> {

  constructor( protected http: HttpClient,
               protected endpointUrl: string,
               protected assembler: TAssembler) {
  }

  /**
   * Handles HTTP errors and returns an observable with a user-friendly error message.
   * @param operation - Description of the operation that failed.
   * @returns A function that takes an HttpErrorResponse and returns an Observable that throws an Error.
   */
  protected handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      let errorMessage = operation;
      if (error.status === 404) {
        errorMessage += `${operation}: Resource not found.`;
      } else if (error.error instanceof ErrorEvent) {
        errorMessage = `${operation}: ${error.error.message}`;
      } else {
        errorMessage = `${operation}: ${error.statusText || 'Unexpected error'}`;
      }
      return throwError(()=> new Error(errorMessage));
    };
  }

  /**
   * Auxiliary HTTP GET method for custom operations
   * @param endpoint - Relative endpoint path
   * @param params - Optional HTTP parameters
   * @returns Observable of the response
   */
  protected _get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    const url = `${this.endpointUrl}/${endpoint}`;
    return this.http.get<T>(url, { params }).pipe(
      catchError(this.handleError(`GET ${endpoint}`))
    );
  }

  /**
   * Auxiliary HTTP POST method for custom operations
   * @param endpoint - Relative endpoint path
   * @param body - Request body
   * @returns Observable of the response
   */
  protected _post<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.endpointUrl}/${endpoint}`;
    return this.http.post<T>(url, body).pipe(
      catchError(this.handleError(`POST ${endpoint}`))
    );
  }

  /**
   * Auxiliary HTTP PUT method for custom operations
   * @param endpoint - Relative endpoint path
   * @param body - Request body
   * @returns Observable of the response
   */
  protected _put<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.endpointUrl}/${endpoint}`;
    return this.http.put<T>(url, body).pipe(
      catchError(this.handleError(`PUT ${endpoint}`))
    );
  }

  /**
   * Auxiliary HTTP DELETE method for custom operations
   * @param endpoint - Relative endpoint path
   * @returns Observable of the response
   */
  protected _delete<T>(endpoint: string): Observable<T> {
    const url = `${this.endpointUrl}/${endpoint}`;
    return this.http.delete<T>(url).pipe(
      catchError(this.handleError(`DELETE ${endpoint}`))
    );
  }

  /**
   * Deletes an entity by its ID.
   * @param id - The ID of the entity to delete.
   * @returns An Observable of void.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpointUrl}/${id}`).pipe(
      catchError(this.handleError('Failed to delete resource'))
    );
  }

  /**
   * Updates an existing entity by its ID.
   * @param entity - The entity to update.
   * @param id - The ID of the entity to update.
   * @returns An Observable of the updated entity.
   */
  update(entity: TEntity, id: number): Observable<TEntity> {
    const resource = this.assembler.toResourceFromEntity(entity);
    return this.http.put<TResource>(`${this.endpointUrl}/${id}`, resource).pipe(
      map(updated => this.assembler.toEntityFromResource(updated)),
      catchError(this.handleError('Failed to update resource'))
    );
  }

  /**
   * Retrieves an entity by its ID from the API.
   * @param id - The ID of the entity to retrieve.
   * @returns An Observable of the entity.
   */
  getById(id: number): Observable<TEntity> {
    return this.http.get<TResource>(`${this.endpointUrl}/${id}`).pipe(
      map(resource => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError('Failed to fetch resource by ID'))
    );
  }

  /**
   * Retrieves all entities from the API. Handling both array and paginated responses.
   * @returns An Observable of an array of entities.
   */
  getAll(): Observable<TEntity[]> {
    return this.http.get<TResponse | TResource>(this.endpointUrl).pipe(
      map(response => {
        console.log(response);
        if (Array.isArray(response)) {
          return response.map(resource => this.assembler.toEntityFromResource(resource));
        }
        return this.assembler.toEntitiesFromResponse(response as TResponse);
      }),
      catchError(this.handleError('Failed to fetch resources'))
    );
  }

  /**
   * Creates a new entity.
   * @param entity - The entity to create.
   * @returns An Observable of the created entity.
   */
  create(entity: TEntity): Observable<TEntity> {
    const resource = this.assembler.toResourceFromEntity(entity);
    return this.http.post<TResource>(this.endpointUrl, resource).pipe(
      map(created => this.assembler.toEntityFromResource(created)),
      catchError(this.handleError('Failed to create resource'))
    );
  }

}
