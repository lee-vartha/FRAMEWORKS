import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // for ngModel
import { HttpClientModule } from '@angular/common/http'; // for Http
import { RouterModule, Routes } from '@angular/router'; // for routing

// Components
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DonorDashboardComponent } from './components/donor-dashboard/donor-dashboard.component';
import { BeneficiaryDashboardComponent } from './components/beneficiary-dashboard/beneficiary-dashboard.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'donor', component: DonorDashboardComponent },
  { path: 'beneficiary', component: BeneficiaryDashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DonorDashboardComponent,
    BeneficiaryDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
  