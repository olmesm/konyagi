import { default as ts } from "@mobily/ts-belt";
const { pipe } = ts;

import { dynamicTaskHandlerImport } from "./taskHandling.js";
import { taskRunner } from "./taskRunner.js";

const main = async (dir: string, initialActions = ["start", "end"]) => {
  const getTaskHandler = await dynamicTaskHandlerImport(dir);

  return pipe(1, (s) => taskRunner(initialActions, s, getTaskHandler));
};

main("actions");
