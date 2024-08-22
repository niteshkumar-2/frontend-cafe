import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = environment.apiUrl;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpclient: HttpClient) {}

  add(data: any) {
    return this.httpclient.post(`${this.url}/product/add/`, data, {
      headers: this.headers,
    });
  }

  update(data: any) {
    return this.httpclient.post(`${this.url}/product/update/`, data, {
      headers: this.headers,
    });
  }

  getProducts() {
    return this.httpclient.get(`${this.url}/product/get/`);
  }

  updateStatus(data: any) {
    return this.httpclient.patch(`${this.url}/product/update/`, data, {
      headers: this.headers,
    });
  }

  delete(id: any) {
    return this.httpclient.patch(`${this.url}/product/delete/${id}`, null, {
      headers: this.headers,
    });
  }
}
