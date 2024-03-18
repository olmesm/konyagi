import type { Job } from "konyagi";

export type State = [Input, Partial<Output>][];

export type Input = {
  fullPath: string;
  content: string;
  meta: Record<string, any>;
};

export type Output = {
  fullPath: string;
  content: string;
  meta: Record<string, any>;
};

export type LocalJob = Job<State>;
