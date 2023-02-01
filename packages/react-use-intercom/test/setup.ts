// FIXME: remove ts-nocheck
// @ts-nocheck
import { JSDOM } from 'jsdom';
const dom = new JSDOM();

// FIXME: Override readyState since this is not fired
// Will be 'completed' in tests
// https://github.com/jsdom/jsdom/issues/1436
Object.defineProperty(document, 'readyState', {
  get() {
    return 'loading';
  },
});
global.document = dom.window.document;
global.window = dom.window;
