import { dynamicTaskHandlerImport, taskRunnerSetup } from "konyagi";

const main = async () => {
  const getTaskHandler = await dynamicTaskHandlerImport("tasks");
  const taskRunner = taskRunnerSetup(getTaskHandler);

  taskRunner(["load-docs"], {});
};

main();
