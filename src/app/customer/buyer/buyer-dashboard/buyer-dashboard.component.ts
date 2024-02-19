import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.scss'
})
export class BuyerDashboardComponent implements OnInit {
  all_product: any
  show_checkout: boolean = false
  constructor(private router: Router, private customerServices: CustomerService) {

  }
  ngOnInit(): void {
    this.getAllProduct()
  }
  getAllProduct() {
    this.customerServices.allProduct().subscribe(data => {
      this.all_product = data
    })
  }

  buyProduct(id: number) {
    this.show_checkout = true
    this.customerServices.quickBuyProduct(id)
    this.router.navigateByUrl('/checkout')
  }

  addToCart() {
    alert("show case")
  }

}
