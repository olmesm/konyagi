import { globbySync } from "globby";
import path from "path";
import { esSafe } from "./helpers/esSafe.js";
import { TaskHandlerCache, Task } from "./types.js";
import * as ts from "@mobily/ts-belt";
import { log } from "./utils/log.js";
const { G } = esSafe(ts);

export const taskHandlerCache: TaskHandlerCache = new Map();
type TaskRecord = Record<string, Task<any>>;

export const getTaskHandler = (taskName: string): TaskRecord => {
  let actions = taskName.includes("#")
    ? { [taskName]: taskHandlerCache.get(taskName)! }
    : Object.fromEntries(
        [...taskHandlerCache.entries()].filter(([_name, _fn]) =>
          _name.startsWith(taskName)
        )
      );

  if (G.isNullable(actions))
    throw new Error(`[error] "${taskName}" was not found as a valid action.`);

  return actions;
};

type TaskObj = Record<string, Task<any>>;
const splitAt = <T>(arr: T[], index: number) => [
  arr.slice(0, index),
  arr.slice(index),
];

export const setTaskHandlers = (...args: (string | Task<any>)[]) => {
  const [keys, fns] = splitAt(args, -1) as unknown as [string[], Task<any>[]];
  log.info("loaded", keys.join("#"));
  taskHandlerCache.set(keys.join("#"), fns.at(0)!);
};

const loader = (p: string) => import(p);

/**
 * See globby for deatils on allowed patterns
 * https://www.npmjs.com/package/globby#patterns
 */
export const dynamicTaskHandlerImport = (
  dir: string[] | string,
  _loader = loader
): Promise<typeof getTaskHandler> =>
  Promise.all(
    globbySync(dir).map((fileName) =>
      _loader(path.resolve(fileName)).then((fns) => {
        const _fileName = fileName.replace(dir + path.sep, "");
        const key = _fileName.replace(path.extname(_fileName), "");

        Object.entries(fns as TaskObj).forEach(([taskName, taskFn]) => {
          setTaskHandlers(key, taskName, taskFn);
        });
      })
    )
  ).then(() => getTaskHandler);
