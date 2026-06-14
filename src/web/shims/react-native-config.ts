const defaultApiUrl = 'https://internal.squash-pride.ru/api/v2';

const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_URL: process.env.API_URL || defaultApiUrl,
};

export const NODE_ENV = config.NODE_ENV;
export const API_URL = config.API_URL;

export default config;