import { readFileSync, writeFileSync } from 'fs';
import { logger } from './logger';

export interface Account {
  token: string;
  names: string[];
}

export interface Config {
  namelists: Record<string, string[]>;
  accounts: {
    token: string;
    namelists: string[];
  }[];
  delays: {
    retry: number;
    nameRetry: number;
  };
  webhook: {
    enabled?: boolean;
    url?: string;
    pingRoleId?: string;
    sendFailures?: boolean;
  };
}

export const defaultConfig: Config = {
  namelists: {},
  accounts: [],
  delays: {
    nameRetry: 10,
    retry: 300,
  },
  webhook: {
    enabled: false,
    sendFailures: false,
    pingRoleId: '',
    url: '',
  },
};

export const writeConfigTemplate = () =>
  writeFileSync('config.json', JSON.stringify(defaultConfig, null, 2));

export const readParseConfig = () => {
  try {
    return JSON.parse(readFileSync('config.json', 'utf8'));
  } catch (error) {
    logger.error(error);
  }
};
