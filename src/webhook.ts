import { WebhookClient, EmbedBuilder } from 'discord.js';

export interface WebhookSniperOptions {
  username?: string;
  avatarUrl?: string;
  url: string;
}

export class WebhookSniper {
  public readonly webhookClient: WebhookClient;

  private readonly avatarUrl?: string;
  private readonly username?: string;

  constructor({ avatarUrl, url, username }: WebhookSniperOptions) {
    this.webhookClient = new WebhookClient({ url });

    this.avatarUrl = avatarUrl;
    this.username = username;
  }

  public sendSuccessfulSnipe({
    id,
    name,
    responseBody,
    statusCode,
    pingRoleId: pingRole,
  }: {
    id: bigint | string;
    name: string;
    responseBody: object;
    statusCode: number;
    pingRoleId?: bigint | string;
  }) {
    const embed = new EmbedBuilder()
      .setTitle('Success')
      .setDescription(`Successfully sniped username \`${name}\` for <@${id}>`)
      .setFields(
        {
          name: 'Response Body',
          value: '```' + JSON.stringify(responseBody, null, 2) + '```',
        },
        { name: 'Status Code', value: `${statusCode}` },
        ...(pingRole
          ? [{ name: 'Ping', value: `<@&${pingRole}>`, inline: true }]
          : [])
      )
      .setTimestamp(Date.now())
      .setColor('Green');

    this.webhookClient.send({
      avatarURL: this.avatarUrl,
      username: this.username,
      embeds: [embed],
    });
  }

  public sendFailureSnipe({
    id,
    name,
    responseBody,
    statusCode,
  }: {
    id: bigint | string;
    name: string;
    responseBody: object;
    statusCode: number;
  }) {
    const embed = new EmbedBuilder()
      .setTitle('Failure')
      .setDescription(`Failed to snipe username \`${name}\` for <@${id}>`)
      .setFields(
        {
          name: 'Response Body',
          value: '```' + JSON.stringify(responseBody, null, 2) + '```',
        },
        { name: 'Status Code', value: `${statusCode}` }
      )
      .setTimestamp(Date.now())
      .setColor('Red');

    this.webhookClient.send({
      avatarURL: this.avatarUrl,
      username: this.username,
      embeds: [embed],
    });
  }
}
