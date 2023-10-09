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
    return this.useActor(SwitchCommands500.ONOFF, ain);
  }


  private async useActor(cmd: SwitchCommands500, ain: string) {
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