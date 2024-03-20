import { z } from "zod";
import { WorkOutput } from "../types.js";

export const workOutputSchema = <S>(
  stateSchema = z.any()
): z.ZodType<WorkOutput<S>> => {
  const outputSchema = z.tuple([z.array(z.string()), stateSchema]);
  return z.union([z.promise(outputSchema), outputSchema]);
};
