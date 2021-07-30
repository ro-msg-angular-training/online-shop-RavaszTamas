import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { httpOptions } from 'src/app/shared/constants';
import { Product } from 'src/app/shared/models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsUrl: string = 'http://localhost:3000/products';


  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    console.log('getProducts() enter');
    const result = this.httpClient.get<Product[]>(this.productsUrl, httpOptions);
    console.log('getProducts() finished', result);
    return result;
  }

  getProduct(id: number): Observable<Product> {
    console.log('getProduct() enter', id);
    const url = `${this.productsUrl}/${id}`;
    console.log('getProduct() path', url);
    const result = this.httpClient.get<Product>(url, httpOptions);
    console.log('getProduct() finished', result);
    return result;
  }

  deleteProduct(id: number): Observable<any> {
    console.log('deleteProduct() enter', id);
    const url = `${this.productsUrl}/${id}`;
    console.log('deleteProduct() path', url);
    const result = this.httpClient.delete(url, httpOptions);
    console.log('deleteProduct() finished', result);
    return result;
  }

  updateProduct(productId: number, product: Partial<Product>) {
    console.log('updateProduct() enter', productId, product);
    const url = `${this.productsUrl}/${productId}`;
    console.log('updateProduct() path', url);
    const result = this.httpClient.put(url, product, httpOptions);
    console.log('updateProduct() finished', result);
    return result;
  }


  createProduct(product: Product) {
    console.log('createProduct() enter', product);
    const url = `${this.productsUrl}`;
    console.log('createProduct() path', url);
    const result = this.httpClient.post(url, product, httpOptions);
    console.log('createProduct() finished', result);
    return result;
  }



}
