import { describe, expect, it } from "vitest";
import { taskRunner } from "./taskRunner.js";

describe("taskrunner", () => {
  it("returns the state if no actions", async () => {
    const state = Math.random();
    const res = taskRunner([], state);
    expect(res).toBe(state);
  });
  it("looks up tasks if a string ref, and appends them to the list", async () => {});
  it("returns a promise or solved result", async () => {});
  it("validates the response", async () => {});
  it("appends any actions from the response to task list", async () => {});
  it("appends only truthy actions", async () => {});
  it("returns a new state", async () => {});
});
