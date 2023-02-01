import testConfig from './test';

/**
 * Possible `NODE_ENV` values
 *
 * @see {@link https://github.com/jaredpalmer/tsdx}
 */
type NodeEnvironment = 'development' | 'production' | 'test';

/**
 * Config structure
 *
 */
export type Config = {
  INTERCOM_APP_ID: string;
};

/**
 * Returns config file based on the current `process.env.NODE_ENV`
 *
 * @remarks Defaults to `test` config
 */
const config = () => {
  switch (process.env.NODE_ENV as NodeEnvironment) {
    case 'test':
      return testConfig;
    default:
      return testConfig;
  }
};

export default config();
