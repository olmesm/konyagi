type TaskName = string;

export type MaybePromise<T> = T | Promise<T>;
export type WorkOutput<S> = MaybePromise<[string[], S]>;
export type Job<S> = (state: S) => WorkOutput<S>;
export type Task<S> = string | Job<S>;

export type TaskHandlerCache = Map<TaskName, Record<string, Task<any>>>;
