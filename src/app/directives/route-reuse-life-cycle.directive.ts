import {ComponentRef, Directive} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';

/*
  This is the best solution I've found so far, here:
    https://stackoverflow.com/questions/46519512/angular2-routereusestrategy-lifecycle-hooks
 */

@Directive({
  selector: '[appRouteReuseLifecycle]',
})
export class RouteReuseLifeCycleDirective {
  constructor(private routerOutlet: RouterOutlet) {
    // Methods need to be patched before content init
    this.patchMethods();
  }

  /**
   * This method patches both onDetach and onAttach methods to call the relevant
   * hooks in the child component before or after running the existing logic
   * @private
   */
  private patchMethods() {
    // Save the original attach method
    const originalAttach = this.routerOutlet.attach;
    // Override the component method
    this.routerOutlet.attach = (ref: ComponentRef<any>, activatedRoute: ActivatedRoute) => {
      originalAttach.bind(this.routerOutlet)(ref, activatedRoute);
      // Call the onAttach hook if exists
      const instance = this.routerOutlet.component as OnAttach;
      if (instance && typeof instance.onAttach === 'function') {
        instance.onAttach();
      }
    };

    // Save the original detach method
    const originalDetach = this.routerOutlet.detach;
    this.routerOutlet.detach = () => {
      const instance = this.routerOutlet.component as OnDetach;
      if (instance && typeof instance.onDetach === 'function') {
        instance.onDetach();
      }
      // return the detached component with the original method
      return originalDetach.bind(this.routerOutlet)();
    };
  }
}

export interface OnAttach {
  onAttach?: () => void;
}

export interface OnDetach {
  onDetach?: () => void;
}
