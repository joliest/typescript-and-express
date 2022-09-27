import 'reflect-metadata';
import express from 'express';

export const router = express.Router();

export function controller(routePrefix: string) {
  /**
   * `Function` will be the class constructor as oppose
   * to methods / properties, it's going to be prototype instead
   */
  return function (target: Function) {
    for (let key in target.prototype) {
      const routeHandlerMethod = target.prototype[key];
      const path = Reflect.getMetadata('path', target.prototype, key);

      // not all key from prototype are not path
      if (path) {
        router.get(`${routePrefix}${path}`, routeHandlerMethod);
      }
    }
  };
}
