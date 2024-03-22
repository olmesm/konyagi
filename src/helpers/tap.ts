import { Job } from "../types.js";

export const kTap =
  (fn: (...args: any[]) => any): Job<any> =>
  async (s) => {
    await fn(s);
    return [[], s];
  };
