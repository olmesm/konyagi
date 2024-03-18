import { z } from "zod";
import { WorkOutput } from "../types.js";

const stateSchema = z.any();

const outputSchema = z.union([z.promise(stateSchema), stateSchema]);

export const workOutput: z.ZodType<WorkOutput<any>> = z.tuple([
  z.array(z.string()),
  outputSchema,
]);
