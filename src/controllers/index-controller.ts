import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from "express";
import { config } from "../config";
import { LoginClient } from "../login/login-client";
import { ControllDect200 } from "./controll-dect200";
import {ControllDect500} from "./controll-dect500";

/**
 * Controller for main index route. (Example only so far)
 *
 */
export const IndexController: Router = Router();

IndexController.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: "Hello from AVM!" });
  } catch (e) {
    next(e);
  }
});

IndexController.get(
  "/api/v1/login-info/",
  (req: Request, res: Response, next: NextFunction) => {
    const loginclient = new LoginClient(config);
    res.status(200).send({ data: String });
    console.log(loginclient.getSessionId());

    loginclient.getSessionId();
  },
);

IndexController.get(
  "/api/v1/switch/200",
  (req: Request, res: Response, next: NextFunction) => {
    const controlldect200 = new ControllDect200(
      new LoginClient(config),
      config,
    );
    controlldect200
      .toggle("116300375371")
      .then((r) => res.status(200).send({ data: r.data }));
  },
);

IndexController.get (
    "/api/v1/switch/500",
    (req: Request, res: Response, next: NextFunction) => {
        const controldect500 = new ControllDect500(
            new LoginClient(config),
            config,
        );
        controldect500
            .onoff("13077 0150676-1")
            .then((r) => res.status(200).send(  { data : r.data}))
    }
)

IndexController.get(
  "/api/v1/collect/",
  (req: Request, res: Response, next: NextFunction) => {
    const controlldect200 = new ControllDect200(
      new LoginClient(config),
      config,
    );
    controlldect200
      .collect("116300375371")
      .then((r) => res.status(200).send({ data: r.data }));
  },
);