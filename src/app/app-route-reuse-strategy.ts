/*
  - https://www.auroria.io/angular-route-reuse-strategy
  - https://itnext.io/cache-components-with-angular-routereusestrategy-3e4c8b174d5f
*/
import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';

const DEBUG = false;

export class AppRouteReuseStrategy implements RouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    /*
      Called when leaving the route.
      If true is returned, store() will be called.
      If false, it should be a NOOP
     */
    const config = route.routeConfig;
    const data = config?.data;
    if (!data) {
      return false;
    }

    if (DEBUG) {
      console.log('%cDEBUG[shouldDetach]', 'background:orange', {reuseComponent: data.reuseComponent, path: config?.path});
    }
    return data.reuseComponent;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    /*
      Will be called if shouldDetach returns true.
     */
    const path = route.routeConfig?.path;
    if (!path) {
      return;
    }

    if (DEBUG) {
      console.log('%cDEBUG[store]', 'background:darkorange', {path});
    }
    this.storedRoutes.set(path, handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    /*
      If true is returned, retrieve() will be called.
      If false, the component will be (re)created.
     */
    const path = route.routeConfig?.path;
    if (!path) {
      return false;
    }

    const doAttach = this.storedRoutes.has(path);
    if (DEBUG) {
      console.log('%cDEBUG[shouldAttach]', 'background:lightgreen', {path, doAttach});
    }
    return doAttach;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    /*
      Called if shouldAttach() returned true.
      It seems I may return null for a NOOP. I'm choosing to throwing errors for now.
     */
    const path = route.routeConfig?.path;
    if (!path) {
      throw new Error('Path is not available, this should not happen!');
    }

    const handle: DetachedRouteHandle | undefined = this.storedRoutes.get(path);
    if (!handle) {
      throw new Error('Detached handle not found, this should not happen!');
    }

    if (DEBUG) {
      console.log('%cDEBUG[retrieve]', 'background:green', {path});
    }

    // @ts-ignore
    handle.componentRef.instance.onRouterReuse()

    return handle;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    /*
    /componentA/1 -> /componentA/2 => will reuse the route (default Angular behavior)
     */

    const doReuse = future.routeConfig === curr.routeConfig;
    if (DEBUG) {
      console.log('%cDEBUG[shouldReuseRoute]', 'background:grey', {doReuse});
    }
    return doReuse;
  }
}
