import { default as ts } from "@mobily/ts-belt";
const { G } = ts;

export const handlePromise = <T, Fn extends (t: T) => any>(
  maybePromise: T | Promise<T>,
  cb: Fn
) => {
  if (G.isPromise<T>(maybePromise))
    return maybePromise.then((resolvedState) => cb(resolvedState));

  return cb(maybePromise as T);
};
