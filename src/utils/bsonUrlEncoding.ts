import base64url from 'base64-url';
import { EJSON } from 'bson';

// BSON can't encode undefined values, so we will use this value instead:
const BSON_UNDEFINED = '__mixmax__undefined__';

/**
 * These will take a paging handle (`next` or `previous`) and encode/decode it
 * as a string which can be passed in a URL.
 */

export const encode = (obj: object): string => {
  if (Array.isArray(obj) && obj[0] === undefined) obj[0] = BSON_UNDEFINED;
  return base64url.encode(EJSON.stringify(obj));
};

export const decode = (str: string): object | undefined => {
  const obj = EJSON.parse(base64url.decode(str));
  if (Array.isArray(obj) && obj[0] === BSON_UNDEFINED) obj[0] = undefined;
  return obj;
};
