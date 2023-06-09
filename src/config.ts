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
    nameRetry: 300,
    retry: 3600,
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

export const readParseConfig = () =>
  JSON.parse(readFileSync('config.json', 'utf8'));
