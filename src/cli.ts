#!/usr/bin/env node
import meow from "meow";
import { dynamicTaskHandlerImport, taskRunnerSetup } from "./index.js";
import fs from "fs";
import path from "path";

const cli = meow(
  `
	Usage
	  $ konyagi [task directory] [first task] [--state-file]

	  # or with typescript support
	  $ NODE_OPTIONS='--import tsx' konyagi [task directory] [first task] [--state-file]

	Examples
	  $ konyagi
	  $ konyagi ./tasks start --state-file state.json
`,
  {
    importMeta: import.meta,
    flags: {
      stateFile: {
        type: "string",
        shortFlag: "s",
      },
    },
  }
);

const main = async () => {
  const getTaskHandler = await dynamicTaskHandlerImport(
    cli.input.at(0) || "tasks"
  );
  const taskRunner = taskRunnerSetup(getTaskHandler);

  let state: any;

  if (cli.flags.stateFile) {
    state = JSON.parse(
      fs.readFileSync(path.resolve(cli.flags.stateFile), "utf-8")
    );
  }

  taskRunner([cli.input.at(1) || "start"], state);
};

main();
