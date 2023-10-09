import dotenv from "dotenv";
import * as process from "process";

/**
 * Application client config.
 *
 
 */
export interface Config {
  boxUrl: string;
  username: string;
  password: string;
}

dotenv.config();

export const config: Config = {
  boxUrl: process.env.FB_URL ?? "",
  username: process.env.FB_USERNAME ?? "",
  password: process.env.FB_PASSWORD ?? "",
};
