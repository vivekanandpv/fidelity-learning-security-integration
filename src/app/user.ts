import { computed, Injectable, signal } from '@angular/core';

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

  removeToken() {
    return this._token.set(null);
  }
}
