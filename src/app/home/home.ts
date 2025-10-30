import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Rest } from '../rest';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  rest = inject(Rest);

  getCart() {
    this.rest.makeGet('https://dummyjson.com/cart').subscribe({
      next: (r) => console.log('Cart Response', r),
    });
  }

  getProducts() {
    this.rest.makeGet('https://dummyjson.com/products').subscribe({
      next: (r) => console.log('Products Response', r),
    });
  }
}
