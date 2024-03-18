import { default as ts } from "@mobily/ts-belt";
const { G, A } = ts;

import { Task, MaybePromise } from "./types.js";
import { handlePromise } from "./utils/handlePromise.js";
import { truthyConcat } from "./utils/truthyConcat.js";
import { workOutput } from "./utils/validators.js";
import { getTaskHandler } from "./taskHandling.js";

export const taskRunnerSetup = <S>(
  taskLookup: (s: string) => Task<S>[] = getTaskHandler
) => {
  const taskRunner = (
    actions: readonly Task<S>[],
    state: S
  ): MaybePromise<S> => {
    const [currentAction, ...nextActions] = actions;

    if (G.isNullable(currentAction)) return state;

    if (G.isString(currentAction)) {
      const expandedActions = taskLookup(currentAction);

      // prepend expansion
      return taskRunner(truthyConcat(expandedActions, nextActions), state);
    }

    const result = currentAction(state);

    // validate response
    workOutput.parse(result);

    if (A.every(result, G.isNullable))
      throw new Error(`[error] ${currentAction.name}`);

    const [newActions, newState] = result;

    // append new actions
    return handlePromise(newState, (resolvedState) =>
      taskRunner(truthyConcat(nextActions, newActions), resolvedState)
    );
  };

  return taskRunner;
};
