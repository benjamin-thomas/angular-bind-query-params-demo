import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyFormComponent} from '../components/my-form.component';
import {MyListComponent} from '../components/my-list.component';

const routes: Routes = [
  {path: '', component: MyFormComponent},
  {path: 'form', component: MyFormComponent},
  {path: 'list', component: MyListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
