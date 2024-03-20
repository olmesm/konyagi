import { Job } from "../types.js";
import { deepLog, log as uLog } from "../utils/log.js";

export const kLog: Job<any> = (s) => {
  uLog.info(deepLog(s, 10));
  return [[], s];
};
