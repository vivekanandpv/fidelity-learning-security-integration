import { computed, Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class User {
  private readonly _token = signal<string | null>(null);

  saveToken(token: string) {
    this._token.set(token);
  }

  get token() {
    return computed(() => this._token());
  }

  get username() {
    return computed(() => {
      const t = this._token();
      return t ? (jwtDecode(t) as any).username : null;
    });
  }

  removeToken() {
    return this._token.set(null);
  }
}
