import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DonateComponent } from './donate/donate.component';


const routes: Routes = [
  { path: 'home', component: LandingPageComponent, pathMatch: 'full'},
  { path: 'donate', component: DonateComponent, pathMatch: 'full'},
  { path: '**', redirectTo: 'home' }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
