import { esSafe } from "../helpers/esSafe.js";
import * as ts from "@mobily/ts-belt";
import { MaybePromise } from "../types.js";
const { G } = esSafe(ts);

export const handlePromise = <T, Fn extends (t: T) => any>(
  maybePromise: MaybePromise<T>,
  cb: Fn
) => {
  if (G.isPromise<T>(maybePromise))
    return maybePromise.then((resolvedState) => cb(resolvedState));

  return cb(maybePromise as T);
};
