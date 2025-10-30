import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Rest } from '../rest';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { toast } from 'ngx-sonner';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface LoginRequest {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly matcher = new MyErrorStateMatcher();
  private readonly rest = inject(Rest);
  private readonly userService = inject(User);
  private readonly ar = inject(ActivatedRoute);
  private readonly returnUrl = computed(
    toSignal(this.ar.queryParams.pipe(map((p) => p['returnUrl'])))
  );
  private readonly router = inject(Router);

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  get username(): FormControl {
    return this.loginForm.controls['username'];
  }

  get password(): FormControl {
    return this.loginForm.controls['password'];
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value as LoginRequest;
      this.rest
        .makePost<LoginRequest, any>('https://dummyjson.com/auth/login', formData)
        .subscribe({
          next: (r) => {
            console.log('Login Response', r);
            this.userService.saveToken(r.accessToken);
            toast.success('Login success');
            this.router.navigateByUrl(this.returnUrl());
          },
          error: (e) => {
            console.error(e);
            toast.error('Login failed');
          },
        });
    } else {
      console.log('Cannot submit an invalid form');
    }
  }
}
