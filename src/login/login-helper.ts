import {type LoginChallenge} from './interfaces';
import crypto from 'crypto';

/**
 * Collection of helping function used in login context.
 *
 
 */

/**
 * Split login session challenge to JSON-model.
 *
 * @param rawValue string representation as send by box
 * @return LoginChallenge parsed challenge
 */
export function parseChallenge(rawValue: string): LoginChallenge {
    const split = rawValue.split('$');
    return {
        iter1: Number.parseInt(split[1]),
        salt1: split[2],
        iter2: Number.parseInt(split[3]),
        salt2: split[4],
    };
}

/**
 * Sign box session challenge with password and challenge params using PBKDF2 signature.
 *
 * @param password user login password
 * @param challenge session challenge to sign
 * @return string signed challenge hash
 */
export async function signChallenge(password: string, challenge: LoginChallenge): Promise<string> {
    const {
        iter1,
        salt1,
        iter2,
        salt2
    } = challenge;

    const hash1 = await pbkdf2HmacSha256(password, salt1, iter1);
    const hash2 = await pbkdf2HmacSha256(hash1, salt2, iter2);
    return salt2 + '$' + hash2.toString('hex');
}

/**
 * PBKDF2 using SHA-265 HMAC. Wrapped and configured to comply with box login specification.
 *
 * @param password password (or hash) to be used as input
 * @param salt hex encoded binary salt
 * @param iter number of iterations
 * @return Promise<Buffer> async hash result
 */
export function pbkdf2HmacSha256(password: string | Buffer, salt: string, iter: number): Promise<Buffer> {
    return new Promise((resolve, reject) => crypto.pbkdf2(password, hexToBuffer(salt), iter, 32, 'sha256', (err, key) => {
        if (err !== null) {
            reject(err);
        } else {
            resolve(key);
        }
    }));
}

/**
 * Convert string hex value binary representation.
 *
 * @param hexValue hex encoded binary value
 * @return Uint8Array binary representation
 */
export function hexToBuffer(hexValue: string): Uint8Array {
    return new Uint8Array((hexValue.match(/../g) ?? []).map(h => parseInt(h, 16)));
}
