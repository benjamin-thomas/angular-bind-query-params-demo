import {Component} from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <span class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </span>
  `,
  styles: [`
    .spinner {
      margin-left: 10px;
    }
    .spinner > div {
      width: 12px;
      height: 12px;
      background-color: lightblue;

      border-radius: 100%;
      display: inline-block;
      -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
      animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }

    .spinner .bounce1 {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    .spinner .bounce2 {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }

    @-webkit-keyframes sk-bouncedelay {
      0%, 80%, 100% { -webkit-transform: scale(0) }
      40% { -webkit-transform: scale(1.0) }
    }

    @keyframes sk-bouncedelay {
      0%, 80%, 100% {
        -webkit-transform: scale(0);
        transform: scale(0);
      } 40% {
          -webkit-transform: scale(1.0);
          transform: scale(1.0);
        }
    }
  `]
})
export class SpinnerComponent {

}
