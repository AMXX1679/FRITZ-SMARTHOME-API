import {LoginClient} from "../login/login-client";
import axios, {AxiosResponse} from "axios";
import {Config} from "../config";

export enum SwitchCommands {
    ON = "setswitchon",
    OFF = "setswitchoff",
    STATE = "getswitchstate",
    TOGGLE = "setswitchtoggle",
    NAME = "getswitchname",
    PRESENT = "getswitchpresent",
    POWER = "getswitchpower",
    ENERGY = "getswitchenergy",
    INFO = "getdevicelistinfos",
    TEMPRATURE = "gettemperature"
}
export class ControllDect200 {
    private readonly homeAutoUrl: string;
    private readonly ain = 116300375371;

    public toggle(ain: string): Promise<AxiosResponse<string>> {
        return this.useActor(SwitchCommands.TOGGLE, ain);
    }

    public collect(ain: string): Promise<AxiosResponse<string>> {
        return (
            this.useActor(SwitchCommands.ENERGY, ain),
            this.useActor(SwitchCommands.STATE, ain),
            this.useActor(SwitchCommands.POWER, ain),
            this.useActor(SwitchCommands.TEMPRATURE, ain),
            this.useActor(SwitchCommands.INFO, ain)
        );

    }

    private async useActor( cmd: SwitchCommands, ain: string) {
        const promise = await this.loginClient.getSessionId().then(
            id  =>  axios.get(this.homeAutoUrl, {
                    params: {
                        ain: ain, cmd: cmd, sid: id
                      }
                }

            ));
        console.log(promise)
        return promise;
    }
    constructor(private readonly loginClient: LoginClient, private readonly config: Config) {
        this.homeAutoUrl = `${this.config.boxUrl}/webservices/homeautoswitch.lua?`;

    }
}
