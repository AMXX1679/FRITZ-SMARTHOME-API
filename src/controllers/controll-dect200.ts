import { LoginClient } from "../login/login-client";
import axios, { AxiosResponse } from "axios";
import { Config } from "../config";

export enum SwitchCommands200 {
  ON = "setswitchon",
  OFF = "setswitchoff",
  STATE = "getswitchstate",
  TOGGLE = "setswitchtoggle",
  NAME = "getswitchname",
  PRESENT = "getswitchpresent",
  POWER = "getswitchpower",
  ENERGY = "getswitchenergy",
  INFO = "getdevicelistinfos",
  TEMPRATURE = "gettemperature",
}

export class ControllDect200 {
  private readonly homeAutoUrl: string;

  public toggle(ain: string): Promise<AxiosResponse<string>> {
    return this.useActor(SwitchCommands200.TOGGLE, ain);
  }

  public collect(ain: string): Promise<AxiosResponse<string>> {
    return (
      this.useActor(SwitchCommands200.ENERGY, ain),
      this.useActor(SwitchCommands200.STATE, ain),
      this.useActor(SwitchCommands200.POWER, ain),
      this.useActor(SwitchCommands200.TEMPRATURE, ain),
      this.useActor(SwitchCommands200.INFO, ain)
    );
  }

  private async useActor(cmd: SwitchCommands200, ain: string) {
    const promise = await this.loginClient.getSessionId().then((id) =>
      axios.get(this.homeAutoUrl, {
        params: {
          ain: ain,
          cmd: cmd,
          sid: id,
        },
      }),
    );
    console.log(promise);
    return promise;
  }
  constructor(
    private readonly loginClient: LoginClient,
    private readonly config: Config,
  ) {
    this.homeAutoUrl = `${this.config.boxUrl}/webservices/homeautoswitch.lua?`;
  }
}
