#!/usr/bin/env node

import { getLocale } from './utils/locale.js';

import App from './classes/App.js';

(async () => {
  const locale = await getLocale();
  const app = new App(locale);

  await app.init();
})();
