import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Rest } from '../rest';
import { toast } from 'ngx-sonner';

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
      next: (r) => {
        console.log('Cart Response', r);
        toast.success('Cart loaded successfully');
      },
      error: (e) => {
        toast.error('Cart load failed');
      },
    });
  }

  getProducts() {
    this.rest.makeGet('https://dummyjson.com/products').subscribe({
      next: (r) => {
        console.log('Products Response', r);
        toast.success('Products loaded successfully');
      },
      error: (e) => {
        toast.error('Products load failed');
      },
    });
  }
}
