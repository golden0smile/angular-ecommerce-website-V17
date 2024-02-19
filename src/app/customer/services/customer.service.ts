import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private single_product_id = new BehaviorSubject(null)
  current_product = this.single_product_id.asObservable()

  private userUrl = "http://localhost:3000/user/"
  private productUrl = "http://localhost:3000/product/"
  private orderUrl = "http://localhost:3000/order/"
  constructor(private apiServices: ApiService) { }

  allProduct(): Observable<any> {
    return this.apiServices.get(this.productUrl)
  }

  quickBuyProduct(product_id: any) {
    this.single_product_id.next(product_id)
  }

  individualProduct(product_id: any) {
    return this.apiServices.get(this.productUrl + product_id)
  }

  userDetails(id: any) {
    return this.apiServices.get(this.userUrl + id)
  }
  insertNewOrder(id: any, oder_details: any): Observable<any> {
    return this.apiServices.put(this.orderUrl + id, oder_details)
  }

  orderDashboardData(): Observable<any> {
    return this.apiServices.get(this.orderUrl)
  }
  productDashboardData(): Observable<any> {
    return this.apiServices.get(this.productUrl)
  }
}
