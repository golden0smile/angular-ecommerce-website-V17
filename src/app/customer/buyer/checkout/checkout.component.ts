import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Product, Orders } from '../../../core/Model/object-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  single_product_id: any
  user_id: any
  user_product!: Product
  user_address: any
  user_contact: any
  order_details!: Orders
  constructor(private router: Router, private customerServices: CustomerService) {

  }
  ngOnInit(): void {
    this.customerServices.current_product.subscribe(product => this.single_product_id = product)
    this.user_id = sessionStorage.getItem("user_session_id")
    this.getUserAddress(this.user_id)
    this.getSingleProduct(this.single_product_id)
    this.placeNewOrder()
  }


  getSingleProduct(single_product_id: any) {
    this.customerServices.individualProduct(single_product_id).subscribe(data => {
      this.user_product = data
      console.log("user---->", this.user_product)
    }, error => {
      console.log("single product", error)
    })
  }

  getUserAddress(user_id: any) {
    this.customerServices.userDetails(user_id).subscribe(data => {
      this.user_address = data.address
      this.user_contact = data.mobNumber
      console.log("add---->", this.user_address)
    })
  }
  placeNewOrder() {
    console.log("user---->", this.user_product)
    this.order_details = {
      id: 0,
      userId: this.user_id,
      sellerId: 2,
      product: {
        id: this.single_product_id,
        name: this.user_product.name,
        uploadPhotos: this.user_product.uploadPhotos,
        productDesc: this.user_product.productDesc,
        mrp: this.user_product.mrp,
        dp: this.user_product.dp,
        status: this.user_product.status
      },
      dateTime: new Date().toLocaleDateString(),
      deliveryAddress: this.user_address,
      contact: this.user_contact,
    }
    console.log("order---->", this.order_details)
    this.customerServices.insertNewOrder(0, this.order_details).subscribe(data => {
      alert("Order placed successfully...")
      this.router.navigateByUrl('/buyer-dashboard')
    }, error => {
      console.log("order place", error)
    })
  }
}
