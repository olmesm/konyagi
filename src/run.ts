import { default as ts } from "@mobily/ts-belt";
const { pipe } = ts;

import { dynamicTaskHandlerImport } from "./taskHandling.js";
import { taskRunnerSetup } from "./taskRunner.js";

const main = async (dir: string, initialActions = ["start", "end"]) => {
  const getTaskHandler = await dynamicTaskHandlerImport(dir);

  const taskRunner = taskRunnerSetup(getTaskHandler);

  return pipe(1, (s) => taskRunner(initialActions, s));
};

main("actions");
