// FIXME: remove ts-nocheck
// @ts-nocheck
import { JSDOM } from 'jsdom';
const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;
