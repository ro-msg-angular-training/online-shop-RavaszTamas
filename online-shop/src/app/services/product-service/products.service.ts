import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { httpOptions } from 'src/app/shared/constants';
import { Product } from 'src/app/shared/models/Product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsUrl = environment.baseUrl + '/products';


  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productsUrl, httpOptions);

  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.httpClient.get<Product>(url, httpOptions);

  }

  deleteProduct(id: number): Observable<void> {
    const url = `${this.productsUrl}/${id}`;
    return this.httpClient.delete<void>(url, httpOptions);
  }

  updateProduct(productId: number, product: Partial<Product>): Observable<void> {
    const url = `${this.productsUrl}/${productId}`;
    return this.httpClient.put<void>(url, product, httpOptions);

  }


  createProduct(product: Product): Observable<Product> {
    const url = `${this.productsUrl}`;
    return this.httpClient.post<Product>(url, product, httpOptions);
  }



}
