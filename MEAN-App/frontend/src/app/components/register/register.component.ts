import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user = { firstName: '', email: '', password: '', memberType: 'donor' };

  constructor(private api: ApiService) {}

  register() {
    this.api.register(this.user).subscribe(res => {
      alert('Registered successfully!');
    });
  }
}
