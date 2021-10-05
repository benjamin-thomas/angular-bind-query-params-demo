import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MyFormComponent} from '../components/my-form.component';
import {MyListComponent} from '../components/my-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouteReuseStrategy} from '@angular/router';
import {AppRouteReuseStrategy} from './app-route-reuse-strategy';

@NgModule({
  declarations: [
    AppComponent,
    MyFormComponent,
    MyListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
