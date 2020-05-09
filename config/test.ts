import dotenv from 'dotenv';
import path from 'path';
import { Config } from '.';

if (!process.env.CI) {
  dotenv.config({ path: path.resolve(`${process.cwd()}/config`, '.env') });
}

const config: Config = {
  INTERCOM_APP_ID: process.env.INTERCOM_APP_ID,
};

export default config;
