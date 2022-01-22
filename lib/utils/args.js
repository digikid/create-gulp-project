export const args = process.argv.slice(2);

export const arg = param => args.includes(`--${param}`);

export const keys = args.filter(arg => !arg.includes('--'));