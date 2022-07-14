import { type ILogger } from '../classes/Logger.js';

export type LoggerSeparateMethod = () => void;

export default (function (this: ILogger) {
  console.log('-'.repeat(process.stdout.columns));
}) as LoggerSeparateMethod;
