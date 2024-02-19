import { Product } from './../core/Model/object-model';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  all_product_data: any
  addEditProductDForm!: FormGroup
  addEditProduct: boolean = false
  addEditPopup_header!: string
  add_product: boolean = false
  edit_product: boolean = false
  product_data: any
  single_data: any
  product_details!: Product
  product_id: any



  constructor(private fb: FormBuilder, private router: Router, private productServices: ProductService) { }
  ngOnInit(): void {
    this.addEditProductDForm = this.fb.group({
      name: ['', Validators.required],
      uploadPhotos: ['', Validators.required],
      productDesc: ['', Validators.required],
      mrp: ['', Validators.required],
      dp: ['', Validators.required],
      status: ['', Validators.required],
    })

    this.getAllProduct()
    console.log(this.all_product_data)
  }

  get rf() {
    return this.addEditProductDForm.controls
  }

  getAllProduct() {
    this.productServices.allProduct().subscribe(data => {
      console.log({ data })
      this.all_product_data = data
    })
  }
  getSingleProduct(id: any) {
    this.productServices.singleProduct(id).subscribe(data => {
      this.product_data = data
      console.log(this.product_data)
    })
  }

  addNewPopup() {
    this.add_product = true,
      this.edit_product = false,
      this.addEditPopup_header = "Add new product"
    this.addEditProductDForm.reset()
  }

  updateProductPopup(id: any) {
    this.add_product = false,
      this.edit_product = true,
      this.product_id = id
    this.addEditPopup_header = "Update product"
    this.productServices.singleProduct(id).subscribe(data => {
      console.log(this.product_data)
      this.single_data = data
      console.log("single", this.single_data)
      this.addEditProductDForm.setValue({
        mrp: this.single_data.mrp,
        dp: this.single_data.dp,
        name: this.single_data.name,
        productDesc: this.single_data.productDesc,
        status: this.single_data.status,
        uploadPhotos: this.single_data.uploadPhotos,
      })
      const myModal = document.getElementById('addEditProductModal');
    })
  }

  addNewProduct() {
    this.add_product = true;
    if (this.addEditProductDForm.invalid) {
      alert("error" + JSON.stringify(this.addEditProductDForm.value))
    }
    this.product_data = this.addEditProductDForm.value
    this.product_details = {
      id: 0,
      name: this.product_data.name,
      uploadPhotos: this.product_data.uploadPhotos,
      productDesc: this.product_data.productDesc,
      mrp: this.product_data.mrp,
      dp: this.product_data.dp,
      status: this.product_data.status,
    }
    this.productServices.addNewProduct(this.product_details).subscribe(data => {
      console.log("add", data)
      this.getAllProduct()
    }, error => {
      console.log("ad new product error", error)
    })
  }

  updateProduct() {
    this.edit_product = true;
    if (this.addEditProductDForm.invalid) {
      alert("error" + JSON.stringify(this.addEditProductDForm.value))
    }
    this.product_data = this.addEditProductDForm.value
    this.product_details = {
      id: 0,
      name: this.product_data.name,
      uploadPhotos: this.product_data.uploadPhotos,
      productDesc: this.product_data.productDesc,
      mrp: this.product_data.mrp,
      dp: this.product_data.dp,
      status: this.product_data.status,
    }
    this.productServices.updateProduct(this.product_id, this.product_details).subscribe(data => {
      console.log("update", data)
      this.getAllProduct()
    }, error => {
      console.log("update product error", error)
    })
  }

  deleteProduct(id: any) {
    this.productServices.deleteProduct(id).subscribe(data => {
      alert("Deleted successfully....")
      this.getAllProduct()
    })
  }
}
