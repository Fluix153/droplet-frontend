import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { AccessStore, AccessState } from './access.store';
import { AccessManagementApiService } from '../infrastructure/access-api';
import { TokenService } from '../infrastructure/services/token.service';
import { User } from '../domain/models/user.entity';

describe('AccessStore', () => {
  let store: AccessStore;
  let mockApiService: jasmine.SpyObj<AccessManagementApiService>;
  let mockTokenService: jasmine.SpyObj<TokenService>;

  const mockUser = new User('1', 'test@example.com', 'Test User', 'user');
  const mockLoginResponse = {
    accessToken: 'fake-token',
    user: mockUser
  };

  beforeEach(() => {
    // Crear mocks
    mockApiService = jasmine.createSpyObj('AccessManagementApiService', [
      'login',
      'logout',
      'getCurrentUser'
    ]);

    mockTokenService = jasmine.createSpyObj('TokenService', [
      'set',
      'clear',
      'isAuthenticated'
    ]);

    TestBed.configureTestingModule({
      providers: [
        AccessStore,
        { provide: AccessManagementApiService, useValue: mockApiService },
        { provide: TokenService, useValue: mockTokenService }
      ]
    });

    store = TestBed.inject(AccessStore);
  });

  describe('Initial State', () => {
    it('should initialize with correct initial state', () => {
      const initialState = store.getCurrentState();

      expect(initialState.currentUser).toBeNull();
      expect(initialState.isLoading).toBeFalsy();
      expect(initialState.error).toBeNull();
    });

    it('should expose state through observables', (done) => {
      store.currentUser$.subscribe(user => {
        expect(user).toBeNull();
        done();
      });
    });
  });

  describe('Login functionality', () => {
    const credentials = { email: 'test@example.com', password: 'password123' };

    beforeEach(() => {
      mockApiService.login.and.returnValue(of(mockLoginResponse));
    });

    it('should set loading state to true when login starts', () => {
      store.login(credentials);

      const state = store.getCurrentState();
      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('should call API service with correct credentials', () => {
      store.login(credentials);

      expect(mockApiService.login).toHaveBeenCalledWith(credentials);
    });

    it('should save token and update state on successful login', (done) => {
      store.login(credentials);

      // Verificar que se llame al TokenService
      setTimeout(() => {
        expect(mockTokenService.set).toHaveBeenCalledWith('fake-token', true);

        // Verificar estado final
        const finalState = store.getCurrentState();
        expect(finalState.currentUser).toEqual(mockUser);
        expect(finalState.isLoading).toBeFalsy();
        expect(finalState.error).toBeNull();
        done();
      }, 0);
    });

    it('should update state with error on login failure', (done) => {
      const errorResponse = { error: { message: 'Invalid credentials' } };
      mockApiService.login.and.returnValue(throwError(() => errorResponse));

      store.login(credentials);

      setTimeout(() => {
        const finalState = store.getCurrentState();
        expect(finalState.currentUser).toBeNull();
        expect(finalState.isLoading).toBeFalsy();
        expect(finalState.error).toBe('Invalid credentials');
        done();
      }, 0);
    });

    it('should use default error message when none provided', (done) => {
      mockApiService.login.and.returnValue(throwError(() => new Error()));

      store.login(credentials);

      setTimeout(() => {
        const finalState = store.getCurrentState();
        expect(finalState.error).toBe('Error durante el login');
        done();
      }, 0);
    });

    it('should emit state changes through observables', (done) => {
      let stateChanges: AccessState[] = [];

      store.state$.subscribe(state => {
        stateChanges.push(state);

        if (stateChanges.length === 3) { // inicial, loading, success
          expect(stateChanges[0].isLoading).toBeFalsy(); // estado inicial
          expect(stateChanges[1].isLoading).toBeTruthy(); // estado loading
          expect(stateChanges[2].isLoading).toBeFalsy(); // estado final
          expect(stateChanges[2].currentUser).toEqual(mockUser);
          done();
        }
      });

      store.login(credentials);
    });
  });

  describe('Logout functionality', () => {
    beforeEach(() => {
      mockApiService.logout.and.returnValue(of(undefined));
    });

    it('should call API service logout method', () => {
      store.logout();

      expect(mockApiService.logout).toHaveBeenCalled();
    });

    it('should clear token and reset state on successful logout', (done) => {
      store.logout();

      setTimeout(() => {
        expect(mockTokenService.clear).toHaveBeenCalled();

        const finalState = store.getCurrentState();
        expect(finalState.currentUser).toBeNull();
        expect(finalState.isLoading).toBeFalsy();
        expect(finalState.error).toBeNull();
        done();
      }, 0);
    });

    it('should clear token even if logout API fails', (done) => {
      mockApiService.logout.and.returnValue(throwError(() => new Error('Server error')));

      store.logout();

      setTimeout(() => {
        expect(mockTokenService.clear).toHaveBeenCalled();

        const finalState = store.getCurrentState();
        expect(finalState.currentUser).toBeNull();
        expect(finalState.error).toBe('Error durante el logout');
        done();
      }, 0);
    });
  });

  describe('Load current user functionality', () => {
    beforeEach(() => {
      mockApiService.getCurrentUser.and.returnValue(of(mockUser));
    });

    it('should not load user if not authenticated', () => {
      mockTokenService.isAuthenticated.and.returnValue(false);

      store.loadCurrentUser();

      expect(mockApiService.getCurrentUser).not.toHaveBeenCalled();
    });

    it('should load user if authenticated', () => {
      mockTokenService.isAuthenticated.and.returnValue(true);

      store.loadCurrentUser();

      expect(mockApiService.getCurrentUser).toHaveBeenCalled();
    });

    it('should update state with user on successful load', (done) => {
      mockTokenService.isAuthenticated.and.returnValue(true);

      store.loadCurrentUser();

      setTimeout(() => {
        const finalState = store.getCurrentState();
        expect(finalState.currentUser).toEqual(mockUser);
        expect(finalState.isLoading).toBeFalsy();
        expect(finalState.error).toBeNull();
        done();
      }, 0);
    });

    it('should clear token and set error on load failure', (done) => {
      mockTokenService.isAuthenticated.and.returnValue(true);
      mockApiService.getCurrentUser.and.returnValue(throwError(() => new Error('Unauthorized')));

      store.loadCurrentUser();

      setTimeout(() => {
        expect(mockTokenService.clear).toHaveBeenCalled();

        const finalState = store.getCurrentState();
        expect(finalState.currentUser).toBeNull();
        expect(finalState.error).toBe('Error al cargar el usuario');
        done();
      }, 0);
    });
  });

  describe('Error management', () => {
    it('should clear error from state', () => {
      // Primero establecer un error
      (store as any).updateState({ error: 'Some error' });
      expect(store.getCurrentState().error).toBe('Some error');

      // Luego limpiarlo
      store.clearError();
      expect(store.getCurrentState().error).toBeNull();
    });
  });

  describe('State management', () => {
    it('should update state correctly with partial updates', () => {
      const initialState = store.getCurrentState();
      expect(initialState.isLoading).toBeFalsy();

      // Actualizar solo isLoading
      (store as any).updateState({ isLoading: true });

      const updatedState = store.getCurrentState();
      expect(updatedState.isLoading).toBeTruthy();
      expect(updatedState.currentUser).toBeNull(); // otros valores no cambian
      expect(updatedState.error).toBeNull();
    });

    it('should maintain immutability when updating state', () => {
      const initialState = store.getCurrentState();

      (store as any).updateState({ isLoading: true });

      const newState = store.getCurrentState();
      expect(newState).not.toBe(initialState); // debe ser una nueva instancia
    });
  });

  describe('Observable streams', () => {
    it('should emit currentUser changes', (done) => {
      store.currentUser$.subscribe(user => {
        if (user === mockUser) {
          expect(user).toEqual(mockUser);
          done();
        }
      });

      (store as any).updateState({ currentUser: mockUser });
    });

    it('should emit loading state changes', (done) => {
      store.isLoading$.subscribe(isLoading => {
        if (isLoading) {
          expect(isLoading).toBeTruthy();
          done();
        }
      });

      (store as any).updateState({ isLoading: true });
    });

    it('should emit error changes', (done) => {
      const errorMessage = 'Test error';

      store.error$.subscribe(error => {
        if (error === errorMessage) {
          expect(error).toBe(errorMessage);
          done();
        }
      });

      (store as any).updateState({ error: errorMessage });
    });
  });

  describe('Integration with dependencies', () => {
    it('should properly inject required services', () => {
      expect((store as any).accessApiService).toBeDefined();
      expect((store as any).tokenService).toBeDefined();
    });

    it('should handle service injection through Angular DI', () => {
      // Verificar que los servicios inyectados son los mocks
      expect((store as any).accessApiService).toBe(mockApiService);
      expect((store as any).tokenService).toBe(mockTokenService);
    });
  });

  describe('Business logic orchestration', () => {
    it('should orchestrate login flow correctly', (done) => {
      const credentials = { email: 'test@example.com', password: 'password123' };
      mockApiService.login.and.returnValue(of(mockLoginResponse));

      let callOrder: string[] = [];

      // Espiar el orden de las llamadas
      mockApiService.login.and.callFake(() => {
        callOrder.push('api-login');
        return of(mockLoginResponse);
      });

      mockTokenService.set.and.callFake(() => {
        callOrder.push('token-set');
      });

      store.login(credentials);

      setTimeout(() => {
        expect(callOrder).toEqual(['api-login', 'token-set']);
        done();
      }, 0);
    });

    it('should handle error scenarios gracefully', (done) => {
      const credentials = { email: 'test@example.com', password: 'password123' };
      mockApiService.login.and.returnValue(throwError(() => ({ error: { message: 'Network error' } })));

      store.login(credentials);

      setTimeout(() => {
        expect(mockTokenService.set).not.toHaveBeenCalled();

        const finalState = store.getCurrentState();
        expect(finalState.error).toBe('Network error');
        expect(finalState.currentUser).toBeNull();
        done();
      }, 0);
    });
  });
});
