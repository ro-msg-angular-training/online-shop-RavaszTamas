import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderRequest } from 'src/app/shared/models/OrderRequest.model';
import { ShoppingCartItem } from 'src/app/shared/models/ShoppingCartItem.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  items: ShoppingCartItem[] = [];
  private ordersUrl = environment.baseUrl+'/orders';
  constructor(private httpClient: HttpClient) { }

  sendOrderRequest(orderRequest: OrderRequest): Observable<void> {
    const url = `${this.ordersUrl}`;
    const myHttpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: "text" as "json"
    }
    const result = this.httpClient.post<void>(url, orderRequest, myHttpOptions);
    return result;
  }


}
