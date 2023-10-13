import {LoginClient} from "../login/login-client";
import axios, {AxiosResponse} from "axios";
import {Config} from "../config";
import xmlJs, {ElementCompact} from "xml-js";

export enum SwitchCommands500 {
    COLOR = "setcolor",
    LEVEL = "setlevelpercentage",
    ONOFF = "setsimpleonoff",
    COLORTEMP = "setcolortemperature",
    INFO = "getdeviceinfos"
}

export class ControllDect500 {
    private readonly homeAutoUrl: string;

    public onOff(ain: string): Promise<AxiosResponse<string>> {
        return this.useActor(SwitchCommands500.ONOFF, ain, {onoff: 2});
    }

    public infoLevel(ain: string): Promise<void> {
        return this.useActor(SwitchCommands500.INFO, ain)
            .then(response => (xmlJs.xml2js(response.data, {compact: true}) as ElementCompact).device.levelcontrol.levelpercentage._text)
    }

    public info(ain: string): Promise<ElementCompact> {
        return this.useActor(SwitchCommands500.INFO, ain)
            .then(response => (xmlJs.xml2js(response.data, {compact: true}) as ElementCompact))
    }

    public infoState(ain: string): Promise<void> {
        return this.useActor(SwitchCommands500.INFO, ain)
            .then(response => (xmlJs.xml2js(response.data, {compact: true}) as ElementCompact).device.simpleonoff.state._text)
    }

    public randomLevel(ain: string): Promise<AxiosResponse<string>> {
        return this.useActor(SwitchCommands500.LEVEL, ain, {level: Math.floor(Math.random() * 101)})
    }

    public setLevel(ain: string, level: number): Promise<AxiosResponse<string>> {
        return this.useActor(SwitchCommands500.LEVEL, ain, {level: level})
    }

    public red(ain: string): Promise<AxiosResponse<string>> {
        return this.useActor(SwitchCommands500.COLOR, ain, {hue: 358}, {saturation: 180})
    }

    public blue(ain: string): Promise<AxiosResponse<string>> {
        return this.useActor(SwitchCommands500.COLOR, ain, {hue: 225}, {saturation: 204})
    }

    public green(ain: string): Promise<AxiosResponse<string>> {
        return this.useActor(SwitchCommands500.COLOR, ain, {hue: 120}, {saturation: 160})
    }

    public yellow(ain: string): Promise<AxiosResponse<string>> {
        return this.useActor(SwitchCommands500.COLOR, ain, {hue: 52}, {saturation: 153})
    }

    private async useActor(cmd: SwitchCommands500, ain: string,
                           param1: { [key: string]: string | number } = {},
                           param2: { [key: string]: string | number } = {},
                           param3: { [key: string]: string | number } = {},
                           param4: { [key: string]: string | number } = {},
    ) {
        const promise = await this.loginClient.getSessionId().then((id) =>
            axios.get(this.homeAutoUrl, {
                params: {
                    ain: ain,
                    cmd: cmd,
                    sid: id,
                    ...param1,
                    ...param2,
                    ...param3,
                    ...param4
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