import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-beneficiary-dashboard',
  templateUrl: './beneficiary-dashboard.component.html'
})
export class BeneficiaryDashboardComponent implements OnInit {
  products: any[] = [];
  balance: number = 0;
  msg = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadProfile();
  }

  loadProducts() {
    this.api.getProducts().subscribe({
      next: (res) => (this.products = res),
      error: () => (this.products = [])
    });
  }

  loadProfile() {
    this.api.getProfile().subscribe({
      next: (res) => (this.balance = res.tokenBalance),
      error: () => (this.balance = 0)
    });
  }

  buyProduct(productId: string) {
    this.api.spendToken(productId).subscribe({
      next: (res) => {
        this.msg = res.msg;
        this.balance = res.balance; // ✅ updated balance from backend
        this.loadProducts(); // refresh list
      },
      error: (err) => {
        this.msg = err.error?.msg || 'Error';
      }
    });
  }
}
