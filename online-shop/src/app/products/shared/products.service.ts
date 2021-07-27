import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './models/Product.model';
import { httpOptions } from './constants';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsUrl:string = 'http://localhost:3000/products';


  constructor(private httpClient : HttpClient) { }

  getProducts():Observable<Product[]> {
      console.log('getProducts() enter');
      const result = this.httpClient.get<Product[]>(this.productsUrl,httpOptions);
      console.log('getProducts() finished',result);
      return result;
  }

  getProduct(id: number): Observable<Product>{
    console.log('getProduct() enter', id);
    const url = `${this.productsUrl}/${id}`;
    console.log('getProduct() path', url);
    const result = this.httpClient.get<Product>(url,httpOptions);
    console.log('getProduct() finished', result);
    return result;
  }

  deleteProduct(id: number) :Observable<any>{
    console.log('deleteProduct() enter', id);
    const url = `${this.productsUrl}/${id}`;
    console.log('deleteProduct() path', url);
    const result = this.httpClient.delete(url,httpOptions);
    console.log('deleteProduct() finished', result);
    return result;
  }

}
