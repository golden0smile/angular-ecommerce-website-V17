import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private product_url = "http://localhost:3000/product/"
  constructor(private apiServices: ApiService) { }

  allProduct(): Observable<any> {
    return this.apiServices.get(this.product_url)
  }

  addNewProduct(product_details: any): Observable<any> {
    return this.apiServices.post(this.product_url, product_details)
  }

  singleProduct(product_id: any) {
    return this.apiServices.get(this.product_url + product_id)
  }
  updateProduct(id: any, product_details: any) {
    return this.apiServices.put(this.product_url + id, product_details)
  }
  deleteProduct(id: any) {
    return this.apiServices.delete(this.product_url + id)
  }
}
