import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { FooterComponent } from './shared/layouts/footer/footer.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-eCommerce-V17';
  screenWidth: any;
  screenHeight: any
  footerMaxWidth!: number;

  constructor() {
    this.getWindowSize(event)
  }
  @HostListener('window:resize', ['$event'])
  getWindowSize(event: any) {
    this.screenHeight = window.innerHeight
    this.screenWidth = window.innerWidth
    this.footerMaxWidth = this.screenHeight - 100
  }
}
