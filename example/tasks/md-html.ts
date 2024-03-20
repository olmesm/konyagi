import * as marked from "marked";

import type { LocalJob } from "../utils/types.js";

marked.use({ gfm: true });

export const mdHtml: LocalJob = (s) => {
  return [
    ["nested/log#goodLog"],
    s.map(([input, output]) => [
      input,
      { ...output, html: marked.parse(input.content) },
    ]),
  ];
};
