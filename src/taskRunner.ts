import { esSafe } from "./helpers/esSafe.js";
import * as ts from "@mobily/ts-belt";
const { G, A } = esSafe(ts);

import { Task, MaybePromise } from "./types.js";
import { handlePromise } from "./utils/handlePromise.js";
import { truthyConcat } from "./utils/truthyConcat.js";
import { workOutputSchema } from "./helpers/validators.js";
import { getTaskHandler } from "./taskHandling.js";

export const taskRunner = <S>(
  actions: readonly Task<S>[],
  state: S,
  taskLookup: (s: string) => Task<S>[] = getTaskHandler,
  _workOutputSchema = workOutputSchema()
): MaybePromise<S> => {
  const [currentAction, ...nextActions] = actions;

  if (G.isNullable(currentAction)) return state;

  if (G.isString(currentAction)) {
    const expandedActions = taskLookup(currentAction);

    // prepend expansion
    return taskRunner(truthyConcat(expandedActions, nextActions), state);
  }

  // append new actions
  return handlePromise(currentAction(state), (resolvedWorkOutput) => {
    // validate response
    _workOutputSchema.parse(resolvedWorkOutput);

    if (A.every(resolvedWorkOutput, G.isNullable))
      throw new Error(`[error] ${currentAction.name}`);

    const [newActions, newState] = resolvedWorkOutput;

    return taskRunner(truthyConcat(nextActions, newActions), newState);
  });
};
