import { routes } from './../../app.routes';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../core/Model/object-model';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, HttpClientModule, FormsModule],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.scss'
})
export class SigninSignupComponent {
  regForm: Boolean = false;
  signUpForm!: FormGroup;
  signInForm!: FormGroup;
  signUpSubmitted = false;
  href: String = "";
  user_data: any;
  user_details!: User;
  user_reg_data: any;
  signInFormValue: any = {};

  constructor(private router: Router, private formBuilder: FormBuilder, private loginService: LoginSignupService) {

  }

  ngOnInit(): void {
    this.href = this.router.url
    if (this.href === "/sign-up") {
      this.regForm = true
    } else if (this.href === "/sign-in") {
      this.regForm = false
    }
    console.log(this.user_details)
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      gender: ['', Validators.required],
      agreetc: ['', Validators.required],
      addLine1: ['', Validators.required],
      addLine2: [],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      aboutYou: ['', Validators.required],
    })

    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  get reg() {
    return this.signUpForm.controls
  }

  get login() {
    return this.signInForm.controls
  }
  onSubmittingSignup() {
    this.signUpSubmitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.user_reg_data = this.signUpForm.value
    this.user_details = {
      name: this.user_reg_data.name,
      mobNumber: this.user_reg_data.mobNumber,
      uploadPhoto: this.user_reg_data.uploadPhoto,
      age: this.user_reg_data.age,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      password: this.user_reg_data.password,
      role: this.user_reg_data.role,
      gender: this.user_reg_data.gender,
      address: {
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
      },
      agreetc: this.user_reg_data.agreetc,
      aboutYou: this.user_reg_data.aboutYou,
    }
    console.log(this.user_details)
    this.loginService.userRegistration(this.user_details).subscribe(data => {
      console.log({ data })
      alert("Register successfully.....")
      // this.router.navigateByUrl("/sign-in")
    })
  }

  onSubmittingSignIn() {
    console.log(this.signInFormValue)
    this.loginService.authLogin(this.signInFormValue.userEmail, this.signInFormValue.userPassword).subscribe((data) => {
      this.user_data = data
      if (this.user_data.length == 1) {
        if (this.user_data[0].role == "seller") {
          sessionStorage.setItem("user_session_id", this.user_data[0].id)
          sessionStorage.setItem("role", this.user_data[0].role)
          this.router.navigateByUrl("/seller-dashboard")

        } else if (this.user_data[0].role == "buyer") {
          sessionStorage.setItem("user_session_id", this.user_data[0].id)
          sessionStorage.setItem("role", this.user_data[0].role)
          this.router.navigateByUrl("/buyer-dashboard")
        }
        else {
          alert("invalid login details... please try again")
        }
      } else {
        alert("Something went wrong...")
      }

    }, error => {
      console.log("my error", error)
    })
  }
}
