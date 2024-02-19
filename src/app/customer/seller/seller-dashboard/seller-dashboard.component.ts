import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.scss'
})
export class SellerDashboardComponent implements OnInit {
  order_dashboard_data: any
  product_dashboard_data: any
  last_order_time: any
  total_order: number = 0
  publish_product: number = 0
  inactive_product: number = 0
  draft_product: number = 0
  total_product: number = 0
  

  constructor(private router: Router, private customerApiServices: CustomerService) {

  }
  ngOnInit(): void {
    this.sellerProductDashboardData()
    this.sellerOrderDashboardData()
    console.log(this.draft_product)
  }
  sellerProductDashboard() {
    this.router.navigateByUrl('/seller/product')
  }

  sellerOrderDashboard() {
    alert("only vip candidate")
  }

  sellerOrderDashboardData() {
    this.customerApiServices.orderDashboardData().subscribe(data => {
      this.order_dashboard_data = data
      this.total_order = Number(this.order_dashboard_data?.length)
      this.last_order_time = this.order_dashboard_data[this.total_order - 1].dateTime
      console.log("orderdata", this.order_dashboard_data)
      console.log("last_order_time", this.last_order_time)
    }, error => {
      console.log("my error", error)
    })
  }

  sellerProductDashboardData() {
    this.customerApiServices.productDashboardData().subscribe(data => {
      this.product_dashboard_data = data
      for (let product in this.product_dashboard_data) {
        console.log("single", this.product_dashboard_data[product])
        if (this.product_dashboard_data[product].status == 'publish') {
          ++this.publish_product
        } else if (this.product_dashboard_data[product].status == 'inactive') {
          ++this.inactive_product
        } else if (this.product_dashboard_data[product].status == 'draft') {
          ++this.draft_product
        }
        ++this.total_product
      }

    }, error => {
      console.log("product dashboard data", error)
    })
  }

}
