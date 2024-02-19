import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn: boolean = false
  user_role!: any
  constructor(private router: Router) {

  }
  ngOnInit(): void {

  }
  ngDoCheck() {
    this.user_role = sessionStorage.getItem("role")
    const user_id = sessionStorage.getItem("user_session_id")
    if (user_id) {
      this.isLoggedIn = true
    }
  }
  logout() {
    sessionStorage.removeItem("user_session_id")
    sessionStorage.removeItem("role")
    this.router.navigateByUrl('/sign-in')
    location.reload()
  }

}
