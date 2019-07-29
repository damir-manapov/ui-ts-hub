import { config as loadEnv } from 'dotenv';
import * as path from 'path';

// Allowed environments.
const environments = [
  'development',
  'production',
];

export const prepareEnvironment = () => {
  const env = process.env.DEPLOY_ENV || 'development';

  if (!environments.includes(env)) {
    throw new Error(`Unknown environment found: ${env}`);
  }

  // Loading default env variables.
  loadEnv({
    path: path.join(process.cwd(), 'env', 'default.env'),
  });

  // Loading env variables depending on current env.
  loadEnv({
    path: path.join(process.cwd(), 'env', `${env}.env`),
  });
};
