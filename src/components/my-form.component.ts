import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BindQueryParamsFactory} from '@ngneat/bind-query-params';

@Component({
  template: `
    <h2>My form!</h2>

    <p style="font-family: 'Courier New',sans-serif">
      {{form.value | json}}
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
      style="margin-top: 10px;"
      routerLink="."
      (click)="refreshNav()"
      [queryParams]="{firstName: 'AAA', lastName: 'BBB'}"
      type="button">SET VIA NAV THEN SYNC DEFS AFTER 1S
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
export class MyFormComponent implements OnDestroy {

  form = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
  });

  manager = this.factory.create([
    {queryKey: 'firstName'},
    {queryKey: 'lastName', strategy: 'modelToUrl'},
  ]).connect(this.form);

  constructor(private factory: BindQueryParamsFactory) {
  }

  ngOnDestroy(): void {
    this.manager.destroy();
  }

  refreshNav() {
    setTimeout(() => {
      this.manager.syncAllDefs();
    }, 1000);
  }
}
