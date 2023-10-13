import { type Application, type Router } from "express";
import { IndexController } from "./controllers/index-controller";

// list of application routes
const _routes: [string, Router][] = [["/", IndexController]];

/**
 * Main router for app.
 *
 
 */
export const routes = (app: Application): void =>
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });