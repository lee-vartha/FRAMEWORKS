import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  form = { name: '', email: '', password: '', role: 'beneficiary' };
  msg = '';

  constructor(private api: ApiService) {}

  register() {
    this.api.register(this.form).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.msg = 'Registered successfully!';
      },
      error: (err) => {
        this.msg = err.error?.msg || 'Error';
      }
    });
  }
}
