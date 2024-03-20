import { log as kLog } from "konyagi";
import { LocalJob } from "../../utils/types.js";

export const badLog: LocalJob = () => {
  throw new Error("dont call this");
};

export const goodLog: LocalJob = kLog;
