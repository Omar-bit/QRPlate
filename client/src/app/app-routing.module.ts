import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'menu/:nameofbuisness', component: MenuPageComponent },
  { path: '', component: LandingComponent },
  {
    path: 'manage-categories',
    component: ManageCategoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'manage-products',
    component: ManageProductsComponent,
    canActivate: [AuthGuard],
  },
  // { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
