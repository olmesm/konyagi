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

    // append new actions
    return handlePromise(currentAction(state), (resolvedState) => {
      // validate response
      workOutput.parse(resolvedState);

      if (A.every(resolvedState, G.isNullable))
        throw new Error(`[error] ${currentAction.name}`);

      const [newActions, newState] = resolvedState;

      return taskRunner(truthyConcat(nextActions, newActions), newState);
    });
  };

  return taskRunner;
};
