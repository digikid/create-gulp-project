import path from 'path';
import ConfigStore from 'configstore';
import { __dirname } from '../utils/path.js';
import { readFile } from '../utils/fs.js';
import { parse as parseArgs } from '../utils/args.js';
import { toDefaults } from '../utils/store.js';
export const paramArgs = ['force'];
export const dependencies = ['animate', 'bootstrap', 'datepicker', 'fancybox', 'mask', 'lozad', 'simplebar', 'swiper', 'tippy'];
export const repoHosts = ['github', 'gitlab', 'bitbucket'];
const configFiles = {
    packageJson: 'package.json',
    repo: 'src/config/repo.json',
    defaults: 'src/config/defaults.json',
    boilerplate: 'src/config/boilerplate.json',
};
export const storeConfig = Object.entries(configFiles).reduce((acc, [key, file]) => {
    acc[key] = JSON.parse(readFile(path.join(__dirname, file)));
    return acc;
}, {});
export const storeDefaults = toDefaults(storeConfig.defaults);
export default class Store {
    constructor() {
        this.repo = storeConfig.repo;
        this.boilerplate = storeConfig.boilerplate;
        this.defaults = storeConfig.defaults;
        this.storeDefaults = storeDefaults;
        this.params = storeConfig.defaults;
        this.dependencies = dependencies;
        this.repoHosts = repoHosts;
        this.args = parseArgs(paramArgs);
        this.packageJson = storeConfig.packageJson;
        this.store = new ConfigStore(storeConfig.packageJson.name, { params: storeDefaults });
    }
    get storedParams() {
        return this.store.get('params');
    }
    set storedParams(params) {
        this.store.set('params', params);
    }
}
