import { type IApp } from '../classes/App.js';
import { command } from '../utils/args.js';

export type InitMethod = () => Promise<void>;

export default (async function (this: IApp) {
  const commandArgs = ['config', 'help', 'restore', 'version'] as const;

  const method = commandArgs.find((arg) => command(arg)) || 'setup';

  await this[method]();
}) as InitMethod;
