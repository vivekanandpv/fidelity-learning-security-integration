import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  userService = inject(User);
  router = inject(Router);

  handleClick() {
    if (this.userService.token()) {
      // logout and go to login
      this.userService.removeToken();
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
