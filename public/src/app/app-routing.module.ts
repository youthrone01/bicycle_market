import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BikeComponent } from './bike/bike.component';
import { BrowseComponent } from './bike/browse/browse.component';
import { ListingComponent } from './bike/listing/listing.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  
  { path: 'bike', component: BikeComponent, children:[
      { path: 'browse', component: BrowseComponent },
      { path: 'listing', component: ListingComponent },
  ] },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
