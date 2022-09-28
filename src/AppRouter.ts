import express from 'express';

export class AppRouter {
  // one copy of router
  private static instance: express.Router;

  // you can use an accessor alternatively
  static getInstance(): express.Router {
    if (!AppRouter.instance) {
      // we didn't use `this` because `instance` is static
      AppRouter.instance = express.Router();
    }

    return AppRouter.instance;
  }
}
