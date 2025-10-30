import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Rest {
  private readonly httpClient = inject(HttpClient);

  makeGet<TRes>(url: string) {
    return this.httpClient.get<TRes>(url);
  }

  makePost<TReq, TRes>(url: string, data: TReq) {
    return this.httpClient.post<TRes>(url, data);
  }

  makePut<TReq, TRes>(url: string, data: TReq) {
    return this.httpClient.put<TRes>(url, data);
  }

  makePatch<TReq, TRes>(url: string, data: TReq) {
    return this.httpClient.patch<TRes>(url, data);
  }

  makeDelete<TRes>(url: string) {
    return this.httpClient.delete<TRes>(url);
  }
}
