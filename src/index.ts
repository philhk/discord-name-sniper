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

export const config: Config =
  readParseConfig() ?? writeConfigTemplate() ?? readParseConfig();

if (!config.accounts.length) {
  logger.warn(`You have not added any accounts. Was that a mistake?`);
}

const { accounts, delays, namelists, webhook } = config;
const { enabled, url, pingRoleId, sendFailures } = webhook;

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

const webhookSniper =
  enabled && url
    ? new WebhookSniper({
        url,
      })
    : void 0;

const attemptAccount = async (account: Account): Promise<boolean> => {
  const { names, token } = account;

  for (const name of names) {
    const res = await postPomelo(token, names[0]);

    logger.info(
      `Tried renaming '${token}' to '${name}' with response ${JSON.stringify(
        res.data
      )} ${res.status}`
    );

    if (webhookSniper) {
      if (sendFailures || res.status === 200)
        webhookSniper[
          res.status === 200 ? 'sendSuccessfulSnipe' : 'sendFailureSnipe'
        ]({
          id: tokenToId(token),
          name: name,
          responseBody: res.data,
          statusCode: res.status,
          pingRoleId: pingRoleId,
        });
    }

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
