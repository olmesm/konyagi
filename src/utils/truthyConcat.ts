import { default as ts } from "@mobily/ts-belt";
const { G, A } = ts;

export const truthyConcat = <T>(a: readonly T[], b: readonly T[]) =>
  A.filter<T>(A.concat<T>(a, b), G.isNotNullable);
