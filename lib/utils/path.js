import path from 'path';
import { fileURLToPath } from 'url';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const dir = (child = '') => child ? path.join(__dirname, `../../${child}`) : __dirname;