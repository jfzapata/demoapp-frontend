import { Injector } from '@angular/core';

/**
 * Gives the root injector of the app module.
 * Used to retrieve an instance of a service. This is used by code that are out of the scope of angular.
 */
export class ServiceLocator {
  public static injector: Injector;
}
