import { esSafe } from "../helpers/esSafe.js";
import * as ts from "@mobily/ts-belt";
const { G, A } = esSafe(ts);

export const truthyConcat = <T>(a: readonly T[], b: readonly T[]) =>
  A.filter<T>(A.concat<T>(a, b), G.isNotNullable);
