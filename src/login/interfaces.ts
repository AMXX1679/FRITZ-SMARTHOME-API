import { type ElementCompact } from "xml-js";

/**
 
 */

/**
 * Logged-in user
 */
export interface User extends ElementCompact {
  User: string;
}

/**
 * Access type of given Right
 */
export enum AccessRight {
  READ = 1,
  WRITE = 2,
}

/**
 * Specific access right of current user session
 */
export interface Right extends ElementCompact {
  Name: ElementCompact;
  Access: AccessRight;
}

/**
 * Session endpoint response
 */
export interface SessionResponse extends ElementCompact {
  SessionInfo: {
    SID: ElementCompact;
    Challenge: ElementCompact;
    BlockTime: ElementCompact;
    Rights: Right[];
    Users: User[];
  };
}

/**
 * Parsed login challenge
 */
export interface LoginChallenge {
  iter1: number;
  salt1: string;
  iter2: number;
  salt2: string;
}
