import util from "util";

export const log = (s: any) => {
  console.log(util.inspect({ s }, { colors: true, depth: 10 }));
  return [[], s];
};
