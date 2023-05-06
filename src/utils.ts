export const sleep = (s: number) =>
  new Promise((res) => setTimeout(res, s * 1000));

export const tokenToId = (token: string) =>
  Buffer.from(token.split('.').at(0) || '', 'base64').toString('ascii');
