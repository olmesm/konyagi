import util from "util";

export const deepLog = (obj: unknown, depth = 6): string =>
  util.inspect(obj, { depth, colors: true });

export const log = {
  info: (...args: any[]): void => {
    process.env.NODE_ENV === "debug" && console.log("[info] ", ...args);
  },
  warn: (...args: any[]): void => {
    process.env.NODE_ENV === "debug" && console.warn("[warn] ", ...args);
  },
  error: (...args: any[]): void => {
    process.env.NODE_ENV === "debug" && console.trace("[error] ", ...args);
  },
  dev: (...args: any[]): void => {
    process.env.NODE_ENV === "debug" && console.log("[dev] ", deepLog(args));
  },
};
