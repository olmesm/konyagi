export const esSafe = <Pkg>(pkg: Pkg): Pkg => (pkg as any).default || pkg;
