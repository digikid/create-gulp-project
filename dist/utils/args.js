export const args = process.argv.slice(2);
export function arg(arg, parseValue) {
    const name = arg.replace(/^([-\s]*)([a-zA-Z\d])/gm, '$2');
    const key = `--${name}`;
    const shortKey = `-${name.substring(0, 1).toLowerCase()}`;
    const value = [key, shortKey].some((key) => args.includes(key));
    if (parseValue) {
        const index = args.findIndex((arg) => [key, shortKey].includes(arg));
        const nextIndex = index + 1;
        if (index >= 0) {
            const next = args[nextIndex];
            if (typeof next === 'string' && !next.includes('-')) {
                return next;
            }
        }
        return '';
    }
    return value;
}
export const command = (name) => args.includes(name);
export const parse = (args) => args.reduce((acc, key) => {
    acc[key] = arg(key, true) || arg(key);
    return acc;
}, {});
