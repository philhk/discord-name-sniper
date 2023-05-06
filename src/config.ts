import * as config_ from '../config.json';

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

export const config = config_ as any as Config;
