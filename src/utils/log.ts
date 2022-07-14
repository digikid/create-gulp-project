import chalk, { type Color as ChalkColors, Modifiers as ChalkModifiers } from 'chalk';

export type ChalkOptions = (ChalkColors | ChalkModifiers)[];

export const format = (text: string, ...options: ChalkOptions): string => {
  if (options.length) {
    return options.reduce((acc, option) => chalk[option](acc), text);
  }

  return text;
};
