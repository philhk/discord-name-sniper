import { postPomelo } from './api';
import { sleep, tokenToId } from './utils';
import {
  Account,
  Config,
  readParseConfig,
  writeConfigTemplate,
} from './config';
import { WebhookSniper } from './webhook';
import { logger } from './logger';
import { existsSync } from 'fs';

if (!existsSync('config.json')) writeConfigTemplate();

export const config: Config = readParseConfig();

if (!config.accounts.length) {
  logger.warn(`You have not added any accounts. Was that a mistake?`);
}

const { accounts, delays, namelists, webhook: webhookConfig } = config;
const { enabled, url, pingRoleId, sendFailures } = webhookConfig;

const parsedAccounts = accounts.map(
  (account): Account => ({
    names: ([] as string[]).concat(
      ...Object.entries(namelists)
        .filter(([name]) => account.namelists.includes(name))
        .map(([, names]) => names)
    ),
    token: account.token,
  })
);

const webhook =
  enabled && url
    ? new WebhookSniper({
        url,
      })
    : void 0;

const attemptAccount = async (account: Account): Promise<boolean> => {
  const { names, token } = account;

  for (const name of names) {
    const res = await postPomelo(token, name);

    logger.info(
      res.status === 200
        ? `Successfully sniped username '${name}' for '${token}' ${JSON.stringify(
            res.data
          )} ${res.status}`
        : `Failed to snipe username '${name}' for '${token}' ${JSON.stringify(
            res.data
          )} ${res.status}`
    );

    if (webhook)
      if (sendFailures || res.status === 200)
        webhook[
          res.status === 200 ? 'sendSuccessfulSnipe' : 'sendFailureSnipe'
        ]({
          id: tokenToId(token),
          name: name,
          responseBody: res.data,
          statusCode: res.status,
          pingRoleId: pingRoleId,
        });

    if (res.data.message === 'Unauthorized') return false;
    if (res.status === 200) return true;

    await sleep(delays.nameRetry);
  }

  return false;
};

for (const account of parsedAccounts) {
  (async () => {
    while (true) {
      if (await attemptAccount(account)) return;

      await sleep(delays.retry);
    }
  })();
}

setInterval(() => void 0, 60 * 60 * 1000);
