import { esSafe } from "./helpers/esSafe.js";
import * as ts from "@mobily/ts-belt";
const { G, A } = esSafe(ts);

import { Task, MaybePromise } from "./types.js";
import { handlePromise } from "./utils/handlePromise.js";
import { truthyConcat } from "./helpers/truthyConcat.js";
import { workOutputSchema } from "./helpers/validators.js";
import { getTaskHandler } from "./taskHandling.js";
import { log } from "./utils/log.js";

export const taskRunner = <S>(
  actions: readonly Task<S>[],
  state: S,
  taskLookup = getTaskHandler,
  _workOutputSchema = workOutputSchema()
): MaybePromise<S> => {
  const [currentAction, ...nextActions] = A.filter(actions, Boolean);

  if (G.isNullable(currentAction)) return state;

  if (G.isString(currentAction)) {
    const newTasks = taskLookup(currentAction);
    const onlyTasks = Object.values(newTasks);

    if (A.every(onlyTasks, G.isNullable))
      throw new Error(`[error] ${currentAction} appears to have no tasks`);

    log.info(
      `new tasks from task lookup "${currentAction}":`,
      Object.keys(newTasks).join(",")
    );

    // prepend expansion
    return taskRunner(truthyConcat(onlyTasks, nextActions), state);
  }

  // append new actions
  return handlePromise(currentAction(state), (resolvedWorkOutput) => {
    // validate response
    _workOutputSchema.parse(resolvedWorkOutput);

    if (A.every(resolvedWorkOutput, G.isNullable))
      throw new Error(`[error] ${currentAction.name}`);

    const [newActions, newState] = resolvedWorkOutput;

    return taskRunner(truthyConcat(newActions, nextActions), newState);
  });
};
