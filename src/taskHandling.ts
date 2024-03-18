import { globbySync } from "globby";
import path from "path";

import { TaskHandlerCache, Task } from "./types.js";
import { default as ts } from "@mobily/ts-belt";
const { G, A, pipe, D } = ts;

export const taskHandlerCache: TaskHandlerCache = new Map();

export const getTaskHandler = (name: string): Task<any>[] => {
  const actions = taskHandlerCache.get(name);

  if (G.isNullable(actions))
    throw new Error(`[error] "${name}" was not found as a valid action.`);

  return Object.values(actions);
};

type TaskObj = Record<string, Task<any>>;

export const setTaskHandlers = (key: string, fns: Record<string, Task<any>>) =>
  taskHandlerCache.set(key, fns);

export const dynamicTaskHandlerImport = (
  dir: string
): Promise<typeof getTaskHandler> =>
  Promise.all(
    globbySync(dir).map((fileName) =>
      import(path.resolve(fileName)).then((fns) => {
        const _fileName = fileName.replace(dir + path.sep, "");
        const key = _fileName.replace(path.extname(_fileName), "");

        // prevent users relying on alphabetical behaviour
        setTaskHandlers(
          key,
          pipe(fns as TaskObj, D.toPairs, A.shuffle, D.fromPairs)
        );
      })
    )
  ).then(() => getTaskHandler);
