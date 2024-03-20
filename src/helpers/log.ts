import { Job } from "../types.js";
import { deepLog, log as uLog } from "../utils/log.js";

export const log: Job<any> = (s) => {
  uLog.dev(deepLog(s, 10));
  return [[], s];
};
