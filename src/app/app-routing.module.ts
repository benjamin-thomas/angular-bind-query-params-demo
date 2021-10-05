import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyFormComponent} from '../components/my-form.component';
import {MyListComponent} from '../components/my-list.component';

export type RouteData = {
  reuseComponent: boolean,
}

const routes: Routes = [
  {path: '', redirectTo: 'form', pathMatch: 'full'},
  {path: 'form', component: MyFormComponent, data: { reuseComponent: true }},
  {path: 'list', component: MyListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
