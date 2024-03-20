import { globbySync } from "globby";
import path from "path";
import { esSafe } from "./helpers/esSafe.js";
import { TaskHandlerCache, Task } from "./types.js";
import * as ts from "@mobily/ts-belt";
const { G, A, pipe, D } = esSafe(ts);

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

        // prevent users relying on alphabetical behaviour
        setTaskHandlers(
          key,
          pipe(fns as TaskObj, D.toPairs, A.shuffle, D.fromPairs)
        );
      })
    )
  ).then(() => getTaskHandler);
