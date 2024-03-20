import { dynamicTaskHandlerImport, taskRunner } from "konyagi";

const main = async () => {
  const getTaskHandler = await dynamicTaskHandlerImport("tasks");

  taskRunner(["load-docs"], {}, getTaskHandler);
};

main();
