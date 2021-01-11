import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { OrderComponent } from './component/order/order.component';
const routes: Routes = [
 
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: '**',
    component: AppComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
