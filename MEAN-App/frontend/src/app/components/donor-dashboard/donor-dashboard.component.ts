import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-donor-dashboard',
  templateUrl: './donor-dashboard.component.html',
})
export class DonorDashboardComponent {
  product = {
    productName: '',
    companyName: '',
    quantity: 0,
    tokenCost: 0,
    waitTime: 0,
    donorId: '' // later to be replaced with actual donor _id (e.g. from login)
  };

  constructor(private api: ApiService) {}

  addProduct() {
    // Optional: replace 'donorId' if you have it in storage
    this.api.addProduct(this.product).subscribe({
      next: (res) => {
        alert('Product added successfully!');
        this.product = {
          productName: '',
          companyName: '',
          quantity: 0,
          tokenCost: 0,
          waitTime: 0,
          donorId: ''
        };
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add product.');
      }
    });
  }
}
