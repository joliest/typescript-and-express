import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';

export function controller(routePrefix: string) {
  /**
   * `Function` will be the class constructor as oppose
   * to methods / properties, it's going to be prototype instead
   */
  return function (target: Function) {
    const router = AppRouter.getInstance();
    for (let key in target.prototype) {
      const routeHandlerMethod = target.prototype[key];
      const path = Reflect.getMetadata('path', target.prototype, key);
      const method: Methods = Reflect.getMetadata(
        'method',
        target.prototype,
        key
      );

      // not all key from prototype are not path
      if (path) {
        router[method](`${routePrefix}${path}`, routeHandlerMethod);
      }
    }
  };
}
