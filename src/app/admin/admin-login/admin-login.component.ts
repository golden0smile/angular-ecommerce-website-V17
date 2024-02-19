
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSignupService } from '../../shared/services/login-signup.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  signInFormValue: any = {}
  user_data: any
  constructor(private router: Router, private loginService: LoginSignupService) {

  }
  ngOnInit(): void {

  }
  onSubmittingAuthSignIn = () => {
    this.loginService.adminAuthLogin(this.signInFormValue.userEmail, this.signInFormValue.userPassword).subscribe(data => {
      console.log(data, "data")
      this.user_data = data
      if (this.user_data.length == 1) {
        sessionStorage.setItem("user_session_id", this.user_data[0].id)
        sessionStorage.setItem("role", this.user_data[0].role)
        this.router.navigate(['./admin-dashboard'])
      } else {
        alert("invalid....")
      }
    }
      , error => {
        console.log(error)
      }
    )
  }
}
