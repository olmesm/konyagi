import util from "util";
import { Job } from "../types.js";

export const log: Job<any> = (s) => {
  console.log(util.inspect({ s }, { colors: true, depth: 10 }));
  return [[], s];
};
