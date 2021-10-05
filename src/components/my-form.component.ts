import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

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
export class MyFormComponent {

  form = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
  })
}
