import { Observable, catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public userUrl = 'http://localhost:3000/user/'
  public productUrl = 'http://localhost:3000/product/'
  public allUserUrl = 'http://localhost:3000/user'
  constructor(private apiServices: ApiService) { }

  userDashboardData() {
    return this.apiServices.get(this.userUrl)
  }

  productDashboardData() {
    return this.apiServices.get(this.productUrl)
  }

  allUserData(): Observable<any> {
    return this.apiServices.get(this.allUserUrl)
  }

  addUser(user_details: any): Observable<any> {
    return this.apiServices.post(this.userUrl, user_details)
  }
  singleUser(user_id: any): Observable<any> {
    return this.apiServices.get(this.userUrl + user_id)
  }

  updateUser(user_id: any, user_details: any): Observable<any> {
    return this.apiServices.put(this.userUrl + user_id, user_details)
  }
  deleteUser(user_id: any): Observable<any> {
    return this.apiServices.delete(this.userUrl + user_id)
  }
}
