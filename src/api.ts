import axios, { AxiosResponse } from 'axios';

export const POMELO_URL = 'https://discord.com/api/v9/users/@me/pomelo';

export interface PostPomeloAttemptResponseData {
  message: string;
  code: number;
}

export const postPomelo = (token: string, name: string) => {
  return axios.post<any, AxiosResponse<PostPomeloAttemptResponseData>>(
    POMELO_URL,
    {
      username: name,
    },
    {
      headers: {
        authorization: token,
        'x-debug-options': 'bugReporterEnabled',
        'x-discord-locale': 'en-US',
        'x-super-properties':
          'eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRGlzY29yZCBDbGllbnQiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfdmVyc2lvbiI6IjEuMC45MDEzIiwib3NfdmVyc2lvbiI6IjEwLjAuMjI2MjEiLCJvc19hcmNoIjoieDY0Iiwic3lzdGVtX2xvY2FsZSI6ImRlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTk1MzIyLCJuYXRpdmVfYnVpbGRfbnVtYmVyIjozMjI2NiwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbCwiZGVzaWduX2lkIjowfQ==',
        Referer: 'https://discord.com/channels/@me',
      },
      validateStatus: () => true,
    }
  );
};
