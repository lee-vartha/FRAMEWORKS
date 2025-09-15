import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-donor-dashboard',
  templateUrl: './donor-dashboard.component.html'
})
export class DonorDashboardComponent implements OnInit {
  products: any[] = [];
  form = { name: '', description: '', cost: 0 };
  msg = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.api.getProducts().subscribe({
      next: (res) => (this.products = res),
      error: () => (this.products = [])
    });
  }

  addProduct() {
    if (!this.form.name || !this.form.description || !this.form.cost) {
      this.msg = 'Please fill all fields';
      return;
    }

    this.api.addProduct(this.form).subscribe({
      next: (res) => {
        this.msg = 'Product added!';
        this.loadProducts();
        this.form = { name: '', description: '', cost: 0 }; // reset form
      },
      error: (err) => {
        this.msg = err.error?.msg || 'Error adding product';
      }
    });
  }
}
