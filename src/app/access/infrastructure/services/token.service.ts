import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly tokenKey = 'droplet_token';

  set(token: string, remember: boolean): void {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(this.tokenKey, token);
  }

  get(): string | null {
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
  }

  clear(): void {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this.get() !== null;
  }
}
