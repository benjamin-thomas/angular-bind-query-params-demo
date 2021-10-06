import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MyFormComponent} from './components/my-form.component';
import {MyListComponent} from './components/my-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouteReuseStrategy} from '@angular/router';
import {AppRouteReuseStrategy} from './app-route-reuse-strategy';
import {SpinnerComponent} from './components/spinner.component';
import {RouteReuseLifeCycleDirective} from './directives/route-reuse-life-cycle.directive';

@NgModule({
  declarations: [
    AppComponent,
    MyFormComponent,
    MyListComponent,
    SpinnerComponent,
    RouteReuseLifeCycleDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
