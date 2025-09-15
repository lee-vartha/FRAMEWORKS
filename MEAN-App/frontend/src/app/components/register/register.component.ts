// importing the modules and services needed
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

// initializing the component with its selector and template
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

// exporting the RegisterComponent class
export class RegisterComponent {
  form = { name: '', email: '', password: '', role: 'beneficiary' };
  msg = '';

  constructor(private api: ApiService) {}

  // register method to create a new user
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
