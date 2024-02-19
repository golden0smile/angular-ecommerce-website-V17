import { ApiService } from './../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  public login_url = "http://localhost:3000";
  public regis_url = "http://localhost:3000";
  //  http://localhost:3000/order
  constructor(private http: HttpClient, private apiService: ApiService) { }
  authLogin(user_name: any, password: any): Observable<any> {
    debugger
    return this.apiService.get(this.login_url + "/user?email=" + user_name + "&password=" + password)
  }

  userRegistration(user_detail: any): Observable<any> {
    return this.apiService.post(this.regis_url + "/user", user_detail)
  }

  adminAuthLogin(user_name: any, password: any): Observable<any> {
    return this.apiService.get(this.login_url + "/user?email=" + user_name + "&password=" + password + "&role=admin")
  }
}
