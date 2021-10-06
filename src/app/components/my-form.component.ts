import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BindQueryParamsFactory} from '@ngneat/bind-query-params';
import {of} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import {OnAttach} from '../directives/route-reuse-life-cycle.directive';

@Component({
  template: `

    <h2>My form!</h2>
    <label for="keep-data">
      Keep form data
      <input style="display: inline"
             [(ngModel)]="keepFormData"
             id="keep-data" type="checkbox">
    </label>

    <h3>Loaded at: {{loadedAt}}</h3>
    <h4>Slow request:
      {{ slowRequest$ | async }}
      <app-spinner *ngIf="showSpinner"></app-spinner>
    </h4>

    <p style="font-family: 'Courier New',sans-serif">
      {{form.value | json}} keep={{ keepFormData }}
    </p>

    <form [formGroup]="form" autocomplete="off">

      <div class="app-form-ctrl">
        <label for="firstName">First name</label>
        <input formControlName="firstName" id="firstName" type="text">
      </div>

      <div class="app-form-ctrl">
        <label for="lastName">Last name</label>
        <input formControlName="lastName" id="lastName" type="text">
      </div>

    </form>

    <button
      style="margin-top: 10px; margin-right: 10px"
      routerLink="."
      (click)="refreshNav()"
      [queryParams]="{firstName: 'AAA', lastName: 'BBB'}"
      type="button">SET VIA NAV THEN SYNC DEFS AFTER 1S
    </button>

    <button (click)="manager.syncAllDefs()" type="button">
      SYNC DEFS
    </button>
  `,
  styles: [
    `
      .app-form-ctrl {
        display: inline-block;
      }

      input {
        display: block;
        margin-right: 20px;
        margin-top: 3px;
        padding: 5px 10px;
      }
    `
  ]
})
export class MyFormComponent implements OnDestroy, OnAttach {
  showSpinner = true;
  keepFormData = true;

  slowRequest$ = of('A SERVER MESSAGE').pipe(
    delay(5000),
    tap(_ => this.showSpinner = false),
  );

  form = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
  });

  manager = this.factory.create([
    {queryKey: 'firstName'},
    {queryKey: 'lastName', strategy: 'modelToUrl'},
  ]).connect(this.form);
  loadedAt: number;

  constructor(private factory: BindQueryParamsFactory) {
    this.loadedAt = Date.now();
  }

  ngOnDestroy(): void {
    this.manager.destroy();
  }

  onAttach(): void {
    console.log('ON ATTACH!!', this.form.value);
    // this.manager.syncAllDefs(); // does not work

    if (this.keepFormData) {
      this.form.setValue(this.form.value); // forces form<>URL sync
    } else {
      this.form.reset(); // Or reset the form
    }
  }

  refreshNav() {
    setTimeout(() => {
      this.manager.syncAllDefs();
    }, 1000);
  }
}
