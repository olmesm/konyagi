import { Job } from "../types.js";
import { deepLog } from "../utils/log.js";
import { kTap } from "./tap.js";

export const kLog: Job<any> = kTap((s) => {
  console.info("[info] ", deepLog(s, 10));
});
