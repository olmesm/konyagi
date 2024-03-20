import type { LocalJob, State } from "../utils/types.js";
import matter from "gray-matter";
import { globby } from "globby";
import path from "path";
import fs from "fs";

const handleParse = (fullPath: string): State[number] => {
  const ext = path.extname(fullPath);
  switch (ext) {
    case ".md": {
      const { data, content } = matter(fs.readFileSync(fullPath, "utf-8"));

      return [{ fullPath, content, meta: { ...data, ext } }, {}];
    }

    default:
      return [{ fullPath, content: "", meta: { ext } }, {}];
  }
};

export const load: LocalJob = async (s) => {
  return globby(path.resolve("example/content")).then((content) => {
    return [
      ["md-html"],
      [
        ...content.map((c) => {
          const fullPath = path.resolve(c);

          return handleParse(fullPath);
        }),
      ],
    ];
  });
};
