import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form = { email: '', password: '' };
  msg = '';

  constructor(private api: ApiService, private router: Router) {}

  login() {
    this.api.login(this.form).subscribe({
      next: (res) => {
        // ✅ Save token and user
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.msg = 'Login successful!';

        // ✅ Navigate by role
        if (res.user.role === 'member') {
          this.router.navigate(['/donor-dashboard']);
        } else {
          this.router.navigate(['/beneficiary-dashboard']);
        }
      },
      error: (err) => {
        this.msg = err.error?.msg || 'Invalid credentials';
      }
    });
  }
}
