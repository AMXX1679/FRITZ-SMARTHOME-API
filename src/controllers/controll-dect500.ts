import { LoginClient } from "../login/login-client";
import axios, { AxiosResponse } from "axios";
import { Config } from "../config";

export enum SwitchCommands500 {
  COLOR = "setcolor",
  LEVEL = "setlevel",
  ONOFF = "setsimpleonoff",
}

export class ControllDect500 {
  private readonly homeAutoUrl: string;

  public onoff(ain: string): Promise<AxiosResponse<string>> {
    return this.useActor(SwitchCommands500.ONOFF, ain, {onoff: 2});
  }


  private async useActor(cmd: SwitchCommands500, ain: string, parms: {[key: string]:string|number} = {}) {
    const promise = await this.loginClient.getSessionId().then((id) =>
      axios.get(this.homeAutoUrl, {
        params: {
          ain: ain,
          cmd: cmd,
          sid: id,
          ...parms
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