import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../../core/Model/object-model';

declare var $: any;
@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.scss'
})
export class UserCrudComponent implements OnInit {
  all_user_data: any;
  sing_user_data: any;
  addEditUserForm!: FormGroup
  user_details!: User
  user_reg_data: any;
  edit_user_id: any;
  upload_file_name!: string;
  addEditUser: boolean = false;
  add_user: boolean = false;
  edit_user: boolean = false;
  popup_header!: string;

  constructor(private router: Router, private formBuilder: FormBuilder, private adminServices: AdminService) {

  }
  ngOnInit(): void {
    console.log(this.add_user, "----->")
    this.getAllUser()
    this.addEditUserForm = this.formBuilder.group({
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
  }

  getAllUser() {
    return this.adminServices.allUserData().subscribe(data => {
      this.all_user_data = data
    }, error => {
      console.log("my error", error)
    })
  }
  get rf() {
    return this.addEditUserForm.controls
  }
  addUserPopup() {
    this.add_user = true;
    this.edit_user = false;
    this.popup_header = "Add new user"
    this.addEditUserForm.reset()
  }

  addUser() {
    this.addEditUser = true
    if (this.addEditUserForm.invalid) {
      alert("Error!!/n/n" + JSON.stringify(this.addEditUserForm.value));
      return;
    }

    this.user_reg_data = this.addEditUserForm.value
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

    this.adminServices.addUser(this.user_details).subscribe(data => {
      this.getAllUser()
      this.addEditUserForm.reset()
      $("#addEditUserModal").model("toggle")
    }, error => {
      console.log("my error", error)
    })
  }


  editUserPopup(user_id: any) {
    this.add_user = false;
    this.edit_user = true;
    this.popup_header = "Update user"
    this.edit_user_id = user_id;
    this.adminServices.singleUser(user_id).subscribe(data => {
      console.log("data--->", data)
      this.sing_user_data = data
      console.log(this.sing_user_data)
      this.upload_file_name = this.sing_user_data.uploadPhoto
      this.addEditUserForm.setValue({
        aboutYou: this.sing_user_data.aboutYou,
        addLine1: this.sing_user_data.address.addLine1,
        addLine2: this.sing_user_data.address.addLine2,
        city: this.sing_user_data.address.city,
        state: this.sing_user_data.address.state,
        zipCode: this.sing_user_data.address.zipCode,
        age: this.sing_user_data.age,
        agreetc: this.sing_user_data.agreetc,
        dob: this.sing_user_data.dob,
        role: this.sing_user_data.role,
        email: this.sing_user_data.email,
        gender: this.sing_user_data.gender,
        name: this.sing_user_data.name,
        mobNumber: this.sing_user_data.mobNumber,
        uploadPhoto: this.sing_user_data.uploadPhoto,
        // uploadPhoto: "",
        password: this.sing_user_data.password,


      })
      const myModal = document.getElementById('addEditUserModal');
    }, error => {
      console.log("my error", error)
    })

  }

  updateUser() {
    this.addEditUser = true
    if (this.addEditUserForm.invalid) {
      alert("Error!!/n/n" + JSON.stringify(this.addEditUserForm.value));
      return;
    }
    this.user_reg_data = this.addEditUserForm.value
    this.user_details = {
      name: this.user_reg_data.name,
      mobNumber: this.user_reg_data.mobNumber,
      uploadPhoto: this.user_reg_data.uploadPhoto == "" ? this.upload_file_name : this.user_reg_data.uploadPhoto,
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
    this.adminServices.updateUser(this.edit_user_id, this.user_details).subscribe(data => {
      this.getAllUser()
      this.addEditUserForm.reset()
      $("#addEditUserModal").model("toggle")
    }, error => {
      console.log("my error", error)
    })
  }

  deleteUser(user_id: any) {
    this.adminServices.deleteUser(user_id).subscribe(data => {
      this.getAllUser()
      alert("Deleted successfully....")
    }, error => {
      console.log("delete error", error)
    })
  }
}
