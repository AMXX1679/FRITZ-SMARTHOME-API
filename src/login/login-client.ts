import axios from "axios";
import xmlJs from "xml-js";
import { type LoginChallenge, type SessionResponse } from "./interfaces";
import * as console from "console";
import { parseChallenge, signChallenge } from "./login-helper";
import { type Config } from "../config";

/**
 * Login client - Manage box login and session state.
 *
 
 */
export class LoginClient {
  /**
   * Box login session endpoint.
   * @private
   */
  private readonly loginUrl: string;

  /**
   * Active box session.
   * @private
   */
  private session: SessionResponse | null = null;

  /**
   * Create a new Login client instance.
   *
   * @param config Box connection config
   */
  constructor(private readonly config: Config) {
    this.loginUrl = `${this.config.boxUrl}/login_sid.lua?version=2`;
  }

  /**
   * @return string the url of the box
   */
  public getServer(): string {
    return this.config.boxUrl;
  }

  /**
   * Obtain a valid session ID. Create a new session if required.
   *
   * @return Promise<string> session ID
   */
  public async getSessionId(): Promise<string> {
    const session = this.getSession();
    const sid = (await session).SessionInfo.SID._text;
    if (typeof sid !== "string") {
      throw new Error("invalid session " + JSON.stringify(session));
    }
    return sid;
  }

  /**
   * Obtain a valid session. Create a new session if required.
   *
   * @return Promise<string> session
   */
  public async getSession(): Promise<SessionResponse> {
    await this.validateSession();

    if (this.session === null) {
      this.session = await this.login();
    }
    return this.session;
  }

  private async login(): Promise<SessionResponse> {
    const challenge: LoginChallenge = await this.getLoginChallenge();
    const challengeResponse = await signChallenge(
      this.config.password,
      challenge,
    );
    return await this.loginWithChallengeResponse(challengeResponse);
  }

  private async getLoginChallenge(): Promise<LoginChallenge> {
    console.debug("Request login challenge");
    const sessionResponse = await axios
      .get<string>(this.loginUrl)
      .then((r) => xmlJs.xml2js(r.data, { compact: true }) as SessionResponse);
    console.debug("Got login challenge response", sessionResponse);
    const challenge = sessionResponse.SessionInfo.Challenge._text;
    if (typeof challenge !== "string") {
      throw new Error(
        "Expected challenge to be string but got " +
          JSON.stringify(challenge) +
          " " +
          JSON.stringify(sessionResponse),
      );
    }
    return parseChallenge(challenge);
  }

  private async loginWithChallengeResponse(
    challengeResponse: string,
  ): Promise<SessionResponse> {
    console.debug("Request login session", {
      username: this.config.username,
      response: challengeResponse,
    });
    const sessionResponse = await axios
      .post(
        this.loginUrl,
        {
          username: this.config.username,
          response: challengeResponse,
        },
        {
          headers: { "content-type": "application/x-www-form-urlencoded" },
        },
      )
      .then((r) => xmlJs.xml2js(r.data, { compact: true }) as SessionResponse);
    console.debug("Got login session", sessionResponse);
    return sessionResponse;
  }

  private async validateSession(): Promise<void> {
    if (this.session === null) {
      return;
    }
    console.debug("Validate session");
    const sessionResponse = await axios
      .post(
        this.loginUrl,
        {
          sid: this.session.SessionInfo.SID._text,
        },
        {
          headers: { "content-type": "application/x-www-form-urlencoded" },
        },
      )
      .then((r) => xmlJs.xml2js(r.data, { compact: true }) as SessionResponse);
    if (
      sessionResponse.SessionInfo.SID._text ===
      this.session.SessionInfo.SID._text
    ) {
      console.debug("Session valid");
    } else {
      console.debug("Session invalid");
      this.session = null;
    }
  }
}
