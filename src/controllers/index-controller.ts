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
import * as path from "path";


/**
 * Controller for main index route. (Example only so far)
 *
 */
export const IndexController: Router = Router();
const loginClient: LoginClient = new LoginClient(config);

IndexController.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: "Hello from AVM!" });
  } catch (e) {
    next(e);
  }
});

IndexController.get(
  "/api/login-info/",
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ data: String });
    console.log(loginClient.getSessionId());

    loginClient.getSessionId();
  },
);

IndexController.get(
  "/api/200/switch",
  (req: Request, res: Response, next: NextFunction) => {
    const controlldect200 = new ControllDect200(
        loginClient,
      config,
    );
    controlldect200
      .toggle("116300375371")
      .then((r) => res.status(200).send({ data: r.data }));
  },
);

IndexController.get (
    "/api/500/switch",
    (req: Request, res: Response, next: NextFunction) => {
        const controldect500 = new ControllDect500(
            loginClient,
            config,
        );
        controldect500
            .onOff("13077 0150676-1")
            .then((r) => res.status(200).send(  { data : r.data}))
    }
)
//https://8.walle.avm.de/webservices/homeautoswitch.lua?switchcmd=setcolortemperature&sid=2fd8da771188b6e1&ain=13077%200150676-1&temperature=6500
//https://8.walle.avm.de/webservices/homeautoswitch.lua?switchcmd=setcolortemperature&sid=0587be96566895b7&ain=113077%200150676-1&temperature=2700&duration=0

IndexController.get(
  "/api/200/collect/",
  (req: Request, res: Response, next: NextFunction) => {
    const controlldect200 = new ControllDect200(
        loginClient,
      config,
    );
    controlldect200
      .collect("116300375371")
      .then((r) => res.status(200).send({ data: r.data }));
  },
);

IndexController.get (
    "/api/500/rlevel",
    (req: Request, res: Response, next: NextFunction) => {
        const controldect500 = new ControllDect500(
            loginClient,
            config,
        );
        controldect500
            .randomLevel("13077 0150676-1")
            .then((r) => res.status(200).send(  { data : r.data}))
    }
)

IndexController.get (
    "/api/500/level/:value",
    (req: Request, res: Response, next: NextFunction) => {
        const controldect500 = new ControllDect500(
            loginClient,
            config,
        );
        controldect500
            .setLevel("13077 0150676-1", Number.parseInt(req.params.value))
            .then((r) => res.status(200).send(  { data : r.data}))
    }
)

IndexController.get (
    "/api/500/color/red",
    (req: Request, res: Response, next: NextFunction) => {
        const controldect500 = new ControllDect500(
            loginClient,
            config,
        );
        controldect500
            .red("13077 0150676-1")
            .then((r) => res.status(200).send(  { data : r.data}))
    }
)

IndexController.get (
    "/api/500/color/blue",
    (req: Request, res: Response, next: NextFunction) => {
        const controldect500 = new ControllDect500(
            loginClient,
            config,
        );
        controldect500
            .blue("13077 0150676-1")
            .then((r) => res.status(200).send(  { data : r.data}))
    }
)

IndexController.get (
    "/api/500/color/green",
    (req: Request, res: Response, next: NextFunction) => {
        const controldect500 = new ControllDect500(
            loginClient,
            config,
        );
        controldect500
            .green("13077 0150676-1")
            .then((r) => res.status(200).send(  { data : r.data}))
    }
)

IndexController.get (
    "/api/home",
    (req: Request, res: Response, next: NextFunction) => {
        const controldect500 = new ControllDect500(
            loginClient,
            config,
        );

        res.sendFile(path.join("/home/arne/Schreibtisch/AVM-API/src/GUI/index.html"))
    }
)

IndexController.get (
    "/api/500/info",
    (req: Request, res: Response, next: NextFunction) => {
        const controldect500 = new ControllDect500(
            loginClient,
            config,
        );
        controldect500
            .info("13077 0150676-1")
            .then((r) => res.status(200).send(  { data : r}))
    }
)