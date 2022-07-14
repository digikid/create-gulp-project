import { toDefaults } from '../utils/store.js';
import { type IApp } from '../classes/App.js';

export type ConfigMethod = () => Promise<void>;

export default (async function (this: IApp) {
  this.log.print('CONFIG_TITLE', 'bold');
  this.log.print('CONFIG_TEXT');

  try {
    await this.prompt(true);

    this.storedParams = toDefaults(this.params);

    this.log.success('CONFIG_SUCCESS');
  } catch (e) {
    this.log.error('CONFIG_ERROR', e);
  }
}) as ConfigMethod;
